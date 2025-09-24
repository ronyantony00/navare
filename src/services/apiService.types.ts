// src/services/apiService.types.ts
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { CareersPageDetails, ClientLogo, faqTag, InsightsPageData, IntegrationTag, Job, JobData, LegalDocument, legalPageData, legalPageListCategoriesResponse, Testimonial } from '@/types/apiTypes';
import type { CaseStudy, FooterText, FreightSectionProps, HeadingDataItem, LegalPageContentResponse, ResourceCompanyNavbarData, SocialLinksData, SolutionsNavbarData, SolutionUseCaseAPIResponse, TawkToData, TechnologySection } from '@/types/commonTypes';
import type { Article } from '@/types/insights';
import type { IntegrationCard } from '@/types/integration';
import type { AboutUs, faqType } from '@/types/interfaces';
import type { LandingPageData } from '@/types/landingPage';
import type { useCaseData } from '@/types/usecase';
import { API_ENDPOINTS } from '@/constants/apiConstants/apiEndpoints';

// Interface for API response with data and meta
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  metadata?: {
    startTime: Date;
  };
}

// Extend axios config type to include metadata
export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}

// Interface for demo booking request
export interface DemoBookingRequest {
  first_name: string;
  last_name: string;
  work_email: string;
  phone_number: string;
  message?: string;
}

// Interface for contact form request
export interface ContactFormRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  privacy_policy_accepted: boolean;
  contact_request_status: string;
  submitted_at: string;
}

// Interface for career form request
export interface CareerFormRequest {
  name: string;
  email: string;
  message: string;
}

// Custom error class for better error handling
export class ApiServiceError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'ApiServiceError';
  }
}

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

// Interface for API request configuration
export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  timeoutMs?: number;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

// Export API endpoints constant
export { API_ENDPOINTS };

// Re-export all type imports for convenience
export type {
  AboutUs,
  Article,
  AxiosError,
  AxiosResponse,
  CareersPageDetails,
  CaseStudy,
  ClientLogo,
  faqTag,
  faqType,
  FooterText,
  FreightSectionProps,
  HeadingDataItem,
  InsightsPageData,
  IntegrationCard,
  IntegrationTag,
  InternalAxiosRequestConfig,
  Job,
  JobData,
  LandingPageData,
  LegalDocument,
  LegalPageContentResponse,
  legalPageData,
  legalPageListCategoriesResponse,
  ResourceCompanyNavbarData,
  SocialLinksData,
  SolutionsNavbarData,
  SolutionUseCaseAPIResponse,
  TawkToData,
  TechnologySection,
  Testimonial,
  useCaseData,
};
