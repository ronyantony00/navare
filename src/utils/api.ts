import { API_ENDPOINTS } from '@/constants/apiConstants/apiEndpoints';

/**
 * Configuration options for API requests
 */
interface ApiOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Enhanced API error with more context
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string,
    public response?: Response,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic helper to call backend APIs with enhanced features.
 * Works in both server and client environments.
 *
 * @param endpoint Relative endpoint string or full URL
 * @param options Enhanced fetch options with timeout and retry
 * @returns Parsed response from the server
 * @throws ApiError when the network request fails or a non-2xx status is returned
 */
export async function fetchFromApi<T = unknown>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    timeout = 10000,
    retries = 0,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  // Determine if we're on server or client
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''
    : process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Determine the intended HTTP method (default GET).
  const method = (fetchOptions.method ?? 'GET').toString().toUpperCase();

  /**
   * Optimised caching strategy for the Next.js App Router:
   *  • Always use `no-store` to fetch fresh data from Strapi API
   *  • This ensures immediate reflection of content changes
   *  • Developers can always override this default by explicitly passing the
   *    `cache` or `next` options when calling `fetchFromApi`.
   */
  const cacheStrategy = fetchOptions.cache ?? 'no-store';

  // To avoid overwriting defaults with `undefined`, exclude `method` and `cache` from the rest object
  const { method: _m, cache: _c, ...restFetchOptions } = fetchOptions;

  const fetchConfig = {
    // Provide our normalised defaults first
    method,
    cache: cacheStrategy,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers ?? {}),
    },
    signal: controller.signal,
    // Spread the remaining options (without method & cache). If developers want to override
    // those they can still do so explicitly after our defaults via `restFetchOptions`.
    ...restFetchOptions,
  } as RequestInit;

  // Combine external signal with our timeout controller if AbortSignal.any is available.
  if (fetchOptions.signal) {
    try {
      // Attempt to combine both signals so either one can abort the request.
      let combined: AbortSignal;

      // Some environments support AbortSignal.any (Node 18+, modern browsers).
      if (typeof AbortSignal !== 'undefined' && typeof (AbortSignal as unknown as { any?: unknown }).any === 'function') {
        combined = (AbortSignal as any).any([
          controller.signal,
          fetchOptions.signal as AbortSignal,
        ]);
      } else {
        // Graceful fallback: just use the external signal.
        combined = fetchOptions.signal;
      }

      fetchConfig.signal = combined;
    } catch {
      // Fallback safety net
      fetchConfig.signal = fetchOptions.signal;
    }
  }

  let lastError: ApiError = new ApiError('Unknown error', undefined, endpoint);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, fetchConfig);
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorBody = await res.text().catch(() => 'Unknown error');
        const message = `Request failed with status ${res.status}: ${errorBody}`;
        throw new ApiError(message, res.status, endpoint, res);
      }

      // Handle different response types
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return (await res.json()) as T;
      } else if (contentType?.includes('text/')) {
        return (await res.text()) as unknown as T;
      } else {
        return (await res.blob()) as unknown as T;
      }
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        lastError = error;
      } else if (error instanceof Error) {
        lastError = new ApiError(
          error.name === 'AbortError'
            ? `Request timed out after ${timeout}ms`
            : error.message,
          undefined,
          endpoint,
        );
      } else {
        lastError = new ApiError('Unknown error occurred', undefined, endpoint);
      }

      // Don't retry on client errors (4xx) or abort errors
      if (lastError.status && lastError.status >= 400 && lastError.status < 500) {
        break;
      }
      if (error instanceof TypeError && error.name === 'AbortError') {
        break;
      }

      // Wait before retry (except on last attempt)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  throw lastError;
}

/**
 * Convenience wrapper for GET requests with optimized timeout
 */
export async function apiGet<T = unknown>(
  endpoint: string,
  options?: Omit<ApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchFromApi<T>(endpoint, {
    timeout: 8000, // Fast timeout for GET requests
    retries: 2, // ✅ Added default retries
    retryDelay: 1000,
    ...options,
    method: 'GET',
  });
}

/**
 * Convenience wrapper for POST requests
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: Omit<ApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchFromApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience wrapper for PUT requests
 */
export async function apiPut<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: Omit<ApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchFromApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience wrapper for DELETE requests
 */
export async function apiDelete<T = unknown>(
  endpoint: string,
  options?: Omit<ApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchFromApi<T>(endpoint, { ...options, method: 'DELETE' });
}

/**
 * Convenience wrapper that accepts an `API_ENDPOINTS` key instead of full string.
 */
export async function fetchFromApiByKey<T = unknown>(
  endpointKey: keyof typeof API_ENDPOINTS,
  options?: ApiOptions & { slug?: string },
): Promise<T> {
  const endpointValue = API_ENDPOINTS[endpointKey];
  if (!endpointValue) {
    throw new Error(`API endpoint for key "${String(endpointKey)}" not found.`);
  }
  let endpoint: string;
  if (typeof endpointValue === 'function') {
    if (!options?.slug) {
      throw new Error(`Endpoint "${String(endpointKey)}" requires a 'slug' parameter.`);
    }
    endpoint = (endpointValue as (slug: string) => string)(options.slug);
  } else {
    endpoint = endpointValue;
  }
  // Remove 'slug' from options before passing to fetchFromApi
  const { slug, ...restOptions } = options ?? {};
  return fetchFromApi<T>(endpoint, restOptions);
}

/**
 * Server-side data fetching helper for Next.js App Router
 * Use this in server components, generateStaticParams, etc.
 */
export async function fetchServerData<T = unknown>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  return fetchFromApi<T>(endpoint, {
    cache: 'no-store', // Always fetch fresh data from Strapi
    ...options,
  });
}

/**
 * Server-side data fetching with revalidation for ISR
 */
export async function fetchServerDataWithRevalidation<T = unknown>(
  endpoint: string,
  revalidate: number | false = 10, // Default: 10 seconds to match page revalidation
  options: Omit<ApiOptions, 'next'> = {},
): Promise<T> {
  return fetchFromApi<T>(endpoint, {
    next: { revalidate },
    ...options,
  });
}
