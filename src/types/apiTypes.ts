import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { title } from './usecase';

// Pagination parameter interface used for API requests
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  withCount?: boolean;
}

// Pagination metadata returned from API responses
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface CareersPageDetails {
  hero_media: { url: string }[];
  page_title?: string;
  company_intro?: string;
  buttonText?: string;
  buttonLink?: string;
  formTitle?: title[];
  formDescription?: string;
  job_list_section_title: {
    tag?: string;
    title?: title[];
    description?: string;
  };
}

export interface JobData {
  id: number;
  jobTitle: string;
  department?: {
    departmentName: string;
  };
  jobLocation: string;
  employmentType?: {
    employmentType: string;
  };
  slug: string;
  job_locations?: {
    id: number;
    jobLocation: string;
  };
}

export interface IntegrationTag {
  id: number;
  tagName: string;
}

export interface Testimonial {
  file?: any;
  id?: number;
  title?: string;
  content?: BlocksContent;
  authorName?: string;
  authorTitle?: string;
  authorCompany?: string;
  authorAvatar?: {
    url: string;
    name?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  companyLogo?: { url: string };
  rating?: number;
  slug?: string;
  studyOn?: string;
  description?: BlocksContent;
  link?: string;
  featured?: boolean;
  shortTestimonial?: string;
  publishedAt?: string;
  thumbnailVideo?: {
    url: string;
    name?: string;
    mime?: string;
  };
  testimonialDetailPageMedia?: {
    url: string;
  };
  createdAt?: string;
  updatedAt?: string;
  documentId?: string;
}

export interface ClientLogo {
  id: number;
  logo: {
    url: string;
  };
  clientName?: string;
  priority?: number;
}

export interface faqTag {
  id: number;
  tag: string;
}

export interface legalCard {
  id: number;
  icon?: { url: string } | string;
  title?: string;
  linkSection: {
    title: string;
    href?: string;
  }[];

}

export interface legalDocumentCategory {
  id: number;
  documentId: string;
  title: string;
  slug: string;
}

export interface legalPageListCategory {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface legalPageListResponse {
  data: legalDocument[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface legalPageListCategoriesResponse {
  data: legalPageListCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface legalDocument {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  documentType: string;
  legalDocumentCategory: legalDocumentCategory;
}

export interface legalPageData {
  title: string;
  hero_title?: string;
  hero_subtitle: string;
  footerSection?: {
    buttonLink?: string;
    buttonText?: string;
    title?: string;
  };
  legalAndCompliance: {
    legalCards: legalCard[];
  };
  data_protection_icon?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  intellectual_propety?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  terms_of_service?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface LegalDocument {
  id: number;
  Title: string;
  content: any;
  lastUpdated?: string;
  documentType: string;
  slug?: string;
  updatedAt?: string;
}

export interface InsightsPageData {
  title: string;
  description: string;
  blogSectionTitle: title[];
  newsListTitle: title[];
  blogSectionTag?: string;
  data_protection_icon?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  intellectual_propety?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  terms_of_service?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Job {
  id: number;
  documentId: string;
  slug: string;
  jobTitle: string;
  jobIntroduction: string;
  jobLocation: string;
  jobDescription: BlocksContent;
  jobDetails: BlocksContent;
  job_link: string;
  otherDetails: string;
  department: {
    id: number;
    departmentName: string;
  };
  employmentType: {
    id: number;
    employmentType: string;
  };
  job_level: {
    id: number;
    jobLevel: string;
  };
  job_locations?: {
    id: number;
    jobLocation: string;
  };
}

export interface BlogData {
  author: {
    id: number;
    name: string;
    publishedAt?: string;
    position?: string;
  };
  contentBlocks?: BlocksContent[];
  blogSection: any[];
  description?: string;
  publishedOn?: string;
  categories: BlogCategory;
  readTime?: string;
  slug: string;
  title: string;
  blogTitle: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  articles: string[];
  description: string;
}
