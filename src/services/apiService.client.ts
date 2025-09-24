// src/services/apiService.client.ts
import type { AxiosError, AxiosResponse } from 'axios';
import type {
  ApiRequestConfig,
  ApiResponse,
  Article,
  CareerFormRequest,
  ContactFormRequest,
  DemoBookingRequest,
  ExtendedAxiosRequestConfig,
  IntegrationCard,
  JobData,
  Testimonial,
} from './apiService.types';

import axios from 'axios';
import qs from 'qs';
import {
  API_ENDPOINTS,
  ApiServiceError,
  RETRY_CONFIG,

} from './apiService.types';

// Helper: Build query string from params using qs
function buildQueryString(params?: Record<string, unknown>): string {
  return qs.stringify(params, { encodeValuesOnly: true, arrayFormat: 'brackets', encode: false });
}

// Client-side axios instance for client components
const clientApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and common headers
clientApiClient.interceptors.request.use(
  (config: ExtendedAxiosRequestConfig) => {
    // Add request ID for tracking
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for centralized error handling
clientApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time in development
    if (process.env.NODE_ENV === 'development' && (response.config as ExtendedAxiosRequestConfig).metadata?.startTime) {
      const duration = new Date().getTime() - (response.config as ExtendedAxiosRequestConfig).metadata!.startTime.getTime();
      console.warn(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    }

    return response;
  },
  (error: AxiosError) => {
    // Centralized error handling
    const status = error.response?.status;
    const message = error.response?.statusText || error.message;
    const url = error.config?.url;

    console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${url} - ${status} ${message}`);

    // Create standardized error
    const apiError = new ApiServiceError(
      `API request failed: ${message}`,
      status,
      url,
      error,
    );

    return Promise.reject(apiError);
  },
);

// Retry function with exponential backoff
async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = RETRY_CONFIG.maxRetries,
  signal?: AbortSignal,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Check if already aborted before making request
      if (signal?.aborted) {
        throw new Error('Request was aborted');
      }

      return await requestFn();
    } catch (error) {
      lastError = error;

      // Don't retry if aborted
      if (signal?.aborted || (error instanceof Error && error.message === 'Request was aborted')) {
        throw error;
      }

      // Don't retry on client errors (4xx) except specific ones
      if (error instanceof ApiServiceError && error.status) {
        if (error.status >= 400 && error.status < 500 && !RETRY_CONFIG.retryableStatuses.includes(error.status)) {
          throw error; // Don't retry client errors
        }
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retry with exponential backoff
      const delay = RETRY_CONFIG.retryDelay * (2 ** attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Generic data processing function - returns data and meta separately
function processApiResponse<T>(response: AxiosResponse): ApiResponse<T> {
  if (!response.data) {
    throw new ApiServiceError('Invalid response: missing data');
  }
  // Handle Strapi response structure: { data: T, meta: {...} }
  // or direct data structure: T
  const responseData = response.data;

  return {
    data: responseData?.data ?? responseData,
    meta: responseData?.meta,
    metadata: (response.config as ExtendedAxiosRequestConfig).metadata,
  };
}

// Generic client-side API function with retry logic and proper resource management
async function makeClientApiRequest<T>(
  endpoint: string,
  errorMessage: string,
  config: ApiRequestConfig = {},
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    data,
    timeoutMs = 15000,
    headers = {},
    params,
  } = config;

  // Build full URL with query parameters if provided
  let url = endpoint;
  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryString(params);
    if (queryString) {
      url += endpoint.includes('?') ? '&' : '?';
      url += queryString;
    }
  }

  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | null = null;
  let isCompleted = false;

  try {
    // Set timeout for request cancellation
    timeoutId = setTimeout(() => {
      if (!isCompleted) {
        controller.abort();
      }
    }, timeoutMs);

    const requestConfig = {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(data ? { data } : {}),
    };

    const response = await retryRequest(
      () => clientApiClient.request({
        method,
        url,
        ...requestConfig,
      }),
      RETRY_CONFIG.maxRetries,
      controller.signal,
    );

    isCompleted = true;
    return processApiResponse(response);
  } catch (error) {
    isCompleted = true;

    if (error instanceof ApiServiceError) {
      throw error;
    }

    throw new ApiServiceError(
      errorMessage,
      undefined,
      endpoint,
      error,
    );
  } finally {
    // Ensure timeout cleanup in all cases
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Note: AbortController cleanup is handled automatically by the timeout
    // or when the request completes. No need to manually abort in finally.
  }
}

// Convenience functions for common HTTP methods
// async function makeGetRequest<T>(
//   endpoint: string,
//   errorMessage: string,
//   timeoutMs?: number,
// ): Promise<ApiResponse<T>> {
//   return makeClientApiRequest<T>(endpoint, errorMessage, { method: 'GET', timeoutMs });
// }

// Client-side API function for careers/jobs data with pagination
export async function getCareersDataClientPaginated(
  page: number = 1,
  pageSize: number = 10,
  filterParams?: { id: number; jobLocation: string }[],
  searchTerm?: string,
): Promise<ApiResponse<JobData[]>> {
  const params: Record<string, unknown> = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
  };

  // Add location filter parameters if provided
  if (filterParams && filterParams.length > 0) {
    const locationFilters = filterParams.map(filter => filter.jobLocation);
    // FIXED: Filter through the relationship field
    params['filters[job_locations][jobLocation][$in]'] = locationFilters;
  }

  // Add search filter if provided (using Strapi's $containsi for case-insensitive job title search)
  if (searchTerm && searchTerm.trim() !== '') {
    params['filters[jobTitle][$containsi]'] = searchTerm.trim();
  }

  // console.log('API Params being sent:', params); // Keep this for debugging

  const response = await clientApiClient.get('/api/careers?sort=createdAt:DESC', { params });
  return response.data;
}

// Client-side API function for testimonial pagination
export async function getTestimonialsDataClientPaginated(page: number = 1, pageSize: number = 9): Promise<ApiResponse<Testimonial[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'priority:ASC',
  };

  const response = await clientApiClient.get('/api/testimonials', { params });
  return response.data;
}

// Client-side API functions for pagination
export async function getNewsDataClientPaginated(page: number = 1, pageSize: number = 10): Promise<ApiResponse<Article[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'createdAt:desc',
    'filters[articleType][$eq]': 'news',
  };

  const response = await clientApiClient.get('/api/articles', { params });
  return response.data;
}

export async function getBlogsDataClientPaginated(page: number = 1, pageSize: number = 10): Promise<ApiResponse<Article[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'createdAt:desc',
    'filters[articleType][$eq]': 'blog',
  };

  const response = await clientApiClient.get('/api/articles', { params });
  return response.data;
}

export async function getIntegrationsDataClientPaginated(page: number = 1, pageSize: number = 10): Promise<ApiResponse<IntegrationCard[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'priority:ASC',
  };

  const response = await clientApiClient.get('/api/integrations', { params });
  return response.data;
}

export async function getFilteredIntegrationsDataClientPaginated(
  filterTag: string,
  page: number = 1,
  pageSize: number = 6,
): Promise<ApiResponse<IntegrationCard[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'priority:ASC',
    'filters[integration_tags][tagName][$eq]': filterTag,
  };

  const response = await clientApiClient.get('/api/integrations', { params });
  return response.data;
}

export async function getSearchIntegrationsDataClientPaginated(
  searchTerm: string,
  page: number = 1,
  pageSize: number = 6,
): Promise<ApiResponse<IntegrationCard[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'priority:ASC',
    'filters[Integration_name][$containsi]': searchTerm,
  };

  const response = await clientApiClient.get('/api/integrations', { params });
  return response.data;
}

// Client-side form submission function for demo booking
export async function submitDemoBookingFormClient(formData: DemoBookingRequest): Promise<ApiResponse<any>> {
  const requestPayload = {
    data: formData,
  };

  try {
    const response = await clientApiClient.post(API_ENDPOINTS.SCHEDULE_DEMO_FORM, requestPayload);
    return response.data;
  } catch (error) {
    console.error('Demo booking form submission error:', error);
    throw new ApiServiceError(
      'Failed to submit demo booking form',
      undefined,
      API_ENDPOINTS.SCHEDULE_DEMO_FORM,
      error,
    );
  }
}

// Client-side form submission function for contact form
export async function submitContactFormClient(formData: ContactFormRequest): Promise<ApiResponse<any>> {
  const requestPayload = {
    data: formData,
  };

  try {
    const response = await clientApiClient.post(API_ENDPOINTS.CONTACT_US_FORM, requestPayload);
    return response.data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new ApiServiceError(
      'Failed to submit contact form',
      undefined,
      API_ENDPOINTS.CONTACT_US_FORM,
      error,
    );
  }
}

// Client-side form submission function for career form
export async function submitCareerFormClient(formData: CareerFormRequest): Promise<ApiResponse<any>> {
  const requestPayload = {
    data: formData,
  };

  try {
    const response = await clientApiClient.post(API_ENDPOINTS.JOB_OPENING_FORM, requestPayload);
    return response.data;
  } catch (error) {
    console.error('Career form submission error:', error);
    throw new ApiServiceError(
      'Failed to submit career form',
      undefined,
      API_ENDPOINTS.JOB_OPENING_FORM,
      error,
    );
  }
}

// Server functions that should use axios (as per user requirements)
export async function getNewsDataServer(page: number = 1, pageSize: number = 4): Promise<ApiResponse<Article[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'createdAt:desc',
    'filters[articleType][$eq]': 'news',
  } as Record<string, unknown>;

  return makeClientApiRequest<Article[]>(
    '/api/articles',
    'Failed to fetch news data',
    { method: 'GET', params },
  );
}

export async function getBlogsDataServer(page: number = 1, pageSize: number = 10): Promise<ApiResponse<Article[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'createdAt:desc',
    'filters[articleType][$eq]': 'blog',
  } as Record<string, unknown>;

  return makeClientApiRequest<Article[]>(
    '/api/articles',
    'Failed to fetch blogs data',
    { method: 'GET', params },
  );
}

export async function getPaginatedTestimonialDataServer(page: number = 1, pageSize: number = 9): Promise<ApiResponse<Testimonial[]>> {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'pagination[withCount]': true,
    'populate': '*',
    'sort': 'priority:ASC',
  } as Record<string, unknown>;

  return makeClientApiRequest<Testimonial[]>(
    '/api/testimonials',
    'Failed to fetch paginated testimonial data',
    { method: 'GET', params },
  );
}

export async function getCareersDataServerPaginated(page: number = 1, pageSize: number = 10): Promise<ApiResponse<JobData[]>> {
  const params = {
    pagination: {
      page,
      pageSize,
      withCount: true,
    },
    populate: '*',
  } as Record<string, unknown>;

  return makeClientApiRequest<JobData[]>(
    '/api/careers?sort=createdAt:DESC',
    'Failed to fetch careers data',
    { method: 'GET', params },
  );
}
