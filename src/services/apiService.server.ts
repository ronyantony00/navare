import type {
  AboutUs,
  ApiResponse,
  Article,
  CareersPageDetails,
  CaseStudy,
  ClientLogo,
  faqTag,
  faqType,
  FooterText,
  FreightSectionProps,
  HeadingDataItem,
  InsightsPageData,
  IntegrationTag,
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
} from './apiService.types';
// src/services/apiService.server.ts
import qs from 'qs';
import {
  API_ENDPOINTS,
  ApiServiceError,

} from './apiService.types';

// Helper: Build query string from params using qs
function buildQueryString(params?: Record<string, unknown>): string {
  return qs.stringify(params, { encodeValuesOnly: true, arrayFormat: 'brackets', encode: false });
}

// Base fetch wrapper for server-side requests with Next.js caching
async function makeServerRequest<T>(
  endpoint: string,
  errorMessage: string,
  //   revalidate: number = 5,
  params?: Record<string, unknown>,
): Promise<ApiResponse<T>> {
  // Build full URL with query parameters if provided
  let url = endpoint;

  // Add content mode status parameter
  const contentMode = process.env.NEXT_PUBLIC_CONTENT_MODE || 'published';
  const statusParam = `status=${contentMode}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryString(params);
    if (queryString) {
      url += '&';
      url += queryString;
    }
  }
  url += `&${statusParam}`;

  const fullUrl = `${process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl, {
      next: {
        revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATION_TIME || '5'),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiServiceError(errorMessage, response.status, endpoint);
    }

    const data = await response.json();
    return {
      data: data?.data ?? data,
      meta: data?.meta,
    };
  } catch (error) {
    if (error instanceof ApiServiceError) {
      throw error;
    }
    throw new ApiServiceError(errorMessage, undefined, endpoint, error);
  }
}

// Convenience function for GET requests
async function makeGetRequest<T>(
  endpoint: string,
  errorMessage: string,
//   revalidate: number = 3600,
): Promise<ApiResponse<T>> {
  return makeServerRequest<T>(endpoint, errorMessage);
}

// Server-side API function for SSR with retry logic
export async function getCareersPageDataServer(): Promise<ApiResponse<CareersPageDetails>> {
  return makeGetRequest<CareersPageDetails>(
    API_ENDPOINTS.CAREERS_PAGE,
    'Failed to fetch careers page data',
  );
}

// Server-side API function for careers/jobs data with retry logic
export async function getCareersDataServer(): Promise<ApiResponse<JobData[]>> {
  return makeGetRequest<JobData[]>(
    API_ENDPOINTS.CAREERS,
    'Failed to fetch careers data',
  );
}

// Note: getCareersDataServerPaginated is implemented in apiService.client.ts using axios
// as per user requirements

export async function getCareerDetailsServer(slug: string): Promise<ApiResponse<JobData>> {
  return makeGetRequest<JobData>(
    API_ENDPOINTS.CAREER_ENDPOINT(slug),
    'Failed to fetch career details',
  );
}

export async function getUsecaseTestimonialDataServer(slug: string): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.USE_CASE_TESTIMONIALS(slug),
    'Failed to fetch testimonial data',
  );
}

export async function getAllTestimonialDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.TESTIMONIALS,
    'Failed to fetch testimonial data',
  );
}

export async function getTestimonialDetailServer(slug: string): Promise<ApiResponse<Testimonial[]>> {
  return makeGetRequest<Testimonial[]>(
    API_ENDPOINTS.TESTIMONIAL_DETAIL(slug),
    'Failed to fetch testimonial data',
  );
}

export async function getLandingPageHeroDataServer(): Promise<ApiResponse<LandingPageData>> {
  return makeGetRequest<LandingPageData>(
    API_ENDPOINTS.LANDINGPAGE_HERO,
    'Failed to fetch landing page hero data',
  );
}

export async function getLandingPageFooterDataServer(): Promise<ApiResponse<LandingPageData>> {
  return makeGetRequest<LandingPageData>(
    API_ENDPOINTS.LANDINGPAGE_FOOTER,
    'Failed to fetch landing page footer data',
  );
}

export async function getLandingPageGeneralDataServer(): Promise<ApiResponse<LandingPageData>> {
  return makeGetRequest<LandingPageData>(
    API_ENDPOINTS.LANDINGPAGE_GENERAL,
    'Failed to fetch landing page general data',
  );
}

export async function getLandingPageKeyValueDataServer(): Promise<ApiResponse<LandingPageData>> {
  return makeGetRequest<LandingPageData>(
    API_ENDPOINTS.LANDINGPAGE_KEY_VALUE,
    'Failed to fetch landing page key value data',
  );
}

export async function getArticlesDataServer(count: number, blogName?: string): Promise<ApiResponse<Article[]>> {
  if (blogName) {
    return makeGetRequest<Article[]>(
      API_ENDPOINTS.ARTICLES_EXCLUDE_BLOG(blogName, count),
      'Failed to fetch articles data',
    );
  } else {
    return makeGetRequest<Article[]>(
      API_ENDPOINTS.ARTICLES_TO_SHOW(count),
      'Failed to fetch articles data',
    );
  }
}

export async function getClientLogosDataServer(): Promise<ApiResponse<ClientLogo[]>> {
  return makeGetRequest<ClientLogo[]>(
    API_ENDPOINTS.CLIENT_LOGO,
    'Failed to fetch client logos data',
  );
}

// Solution Section API functions
export async function getSolutionHeroDataServer(slug: string): Promise<ApiResponse<HeadingDataItem[]>> {
  const endpoint = `/api/solutions?filters[slug][$eq]=${slug}&populate[heroSection][populate]=*&populate[navbarCard][populate]=*&populate[keyFeaturesSection][populate]=*&populate[advantagesListSection][populate]=*&populate[usecasesSection][populate]=*&populate[generalSection][populate]=*&populate[aboutSection][populate]=*&populate[testimonialCardSection][populate]=*&populate[technologySection][populate][titleSection][populate]=*&populate[knowMoreSection][populate][titleSection][populate]=*`;
  return makeGetRequest<HeadingDataItem[]>(
    endpoint,
    'Failed to fetch solution hero data',
  );
}

export async function getSolutionKnowMoreDataServer(slug: string): Promise<ApiResponse<TechnologySection[]>> {
  const endpoint = `/api/solutions?filters[slug][$eq]=${slug}&populate[knowMoreSection][populate][titleSection][populate]=*&populate[knowMoreSection][populate][media][populate]=*`;
  return makeGetRequest<TechnologySection[]>(
    endpoint,
    'Failed to fetch solutions data',
  );
}

export async function getSolutionAdvantageDataServer(slug: string): Promise<ApiResponse<HeadingDataItem[]>> {
  const endpoint = `/api/solutions?filters[slug][$eq]=${slug}&populate[advantagesListSection][populate][advantage_item][populate]=*&populate[advantagesListSection][populate][title][populate]=*`;

  return makeGetRequest<HeadingDataItem[]>(
    endpoint,
    'Failed to fetch solution advantage data',
  );
}

export async function getSolutionUseCaseDataServer(slug: string): Promise<ApiResponse<SolutionUseCaseAPIResponse[]>> {
  const endpoint = `/api/solutions?filters[slug][$eq]=${slug}&populate[usecasesSection][populate][solution_usecase_card][populate]=*`;

  return makeGetRequest<SolutionUseCaseAPIResponse[]>(
    endpoint,
    'Failed to fetch solution use case data',
  );
}

export async function getSolutionFeatureTabDataServer(slug: string): Promise<ApiResponse<HeadingDataItem[]>> {
  const endpoint = `/api/solutions?filters[slug][$eq]=${slug}&populate[keyFeaturesSection][populate][solution_feature_card][populate]=*`;

  return makeGetRequest<HeadingDataItem[]>(
    endpoint,
    'Failed to fetch solution feature tab data',
  );
}

export async function getVideoTestimonialsDataServer(): Promise<ApiResponse<Testimonial[]>> {
  return makeGetRequest<Testimonial[]>(
    API_ENDPOINTS.VIDEO_TESTIMONIALS,
    'Failed to fetch testimonials data',
  );
}

export async function getSolutionTestimonialsDataServer(slug: string): Promise<ApiResponse<Testimonial[]>> {
  return makeGetRequest<Testimonial[]>(
    API_ENDPOINTS.SOLUTIONS_TESTIMONIALS(slug),
    'Failed to fetch solution testimonials data',
  );
}

export async function getCaseStudyDataServer(): Promise<ApiResponse<CaseStudy[]>> {
  return makeGetRequest<CaseStudy[]>(
    API_ENDPOINTS.CASE_STUDY,
    'Failed to fetch case study data',
  );
}

export async function getApiSectionDataServer(): Promise<ApiResponse<FreightSectionProps['solutionData']>> {
  return makeGetRequest<FreightSectionProps['solutionData']>(
    API_ENDPOINTS.API_SECTION,
    'Failed to fetch API section data',
  );
}

export async function getUsecaseDataServer(slug: string): Promise<ApiResponse<useCaseData[]>> {
  return makeGetRequest<useCaseData[]>(
    API_ENDPOINTS.USE_CASE_BY_SLUG(slug),
    'Failed to fetch usecase data',
  );
}

export async function getAboutusDataServer(): Promise<ApiResponse<AboutUs>> {
  return makeGetRequest<AboutUs>(
    API_ENDPOINTS.ABOUT_US,
    'Failed to fetch about us data',
  );
}

export async function getWhoWeAreDataServer(): Promise<ApiResponse<AboutUs>> {
  return makeGetRequest<AboutUs>(
    API_ENDPOINTS.WHO_WE_ARE,
    'Failed to fetch who we are data',
  );
}

export async function getAboutusWhoWeAreDataServer(): Promise<ApiResponse<AboutUs>> {
  return makeGetRequest<AboutUs>(
    API_ENDPOINTS.ABOUT_US_WHO_WE_ARE,
    'Failed to fetch about us who we are data',
  );
}

export async function getAboutusBenefitsDataServer(): Promise<ApiResponse<AboutUs>> {
  return makeGetRequest<AboutUs>(
    API_ENDPOINTS.ABOUT_US_BENEFITS,
    'Failed to fetch about us benefits data',
  );
}

export async function getAboutusOurVisionDataServer(): Promise<ApiResponse<AboutUs>> {
  return makeGetRequest<AboutUs>(
    API_ENDPOINTS.ABOUT_US_OUR_VISION,
    'Failed to fetch about us our vision data',
  );
}

export async function getLegalPageDataServer(): Promise<ApiResponse<legalPageData>> {
  return makeGetRequest<legalPageData>(
    API_ENDPOINTS.LEGAL_PAGE,
    'Failed to fetch legal page data',
  );
}

export async function getTermsOfUseDataServer(slug: string): Promise<ApiResponse<LegalDocument[]>> {
  return makeGetRequest<LegalDocument[]>(
    API_ENDPOINTS.TERMS_OF_USE(slug),
    'Failed to fetch terms of use data',
  );
}

export async function getLegalPageListServer(): Promise<ApiResponse<legalPageListCategoriesResponse>> {
  return makeGetRequest<legalPageListCategoriesResponse>(
    API_ENDPOINTS.LEGAL_PAGE_LIST,
    'Failed to fetch legal page list data',
  );
}

export async function getJobLocationsDataServer(): Promise<ApiResponse<Job[]>> {
  return makeGetRequest<Job[]>(
    API_ENDPOINTS.JOB_LOCATIONS,
    'Failed to fetch job locations data',
  );
}

export async function getCareerDeatilDataServer(slug: string): Promise<ApiResponse<Job[]>> {
  return makeGetRequest<Job[]>(
    API_ENDPOINTS.CAREER_ENDPOINT(slug),
    'Failed to fetch career details data',
  );
}

export async function getBlogDetailDataServer(slug: string): Promise<ApiResponse<Article[]>> {
  return makeGetRequest<Article[]>(
    API_ENDPOINTS.BLOG_DETAIL(slug),
    'Failed to fetch blog details data',
  );
}

export async function getFaqDataServer(): Promise<ApiResponse<faqType[]>> {
  return makeGetRequest<faqType[]>(
    API_ENDPOINTS.FAQ,
    'Failed to fetch FAQ data',
  );
}

export async function getFaqTagsDataServer(): Promise<ApiResponse<faqTag[]>> {
  return makeGetRequest<faqTag[]>(
    API_ENDPOINTS.FAQ_TAGS,
    'Failed to fetch FAQ tags data',
  );
}

export async function getFaqPageDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.FAQ_PAGE,
    'Failed to fetch FAQ page data',
  );
}

export async function getUsecaseBySlugServer(slug: string): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.USE_CASE_BY_SLUG(slug),
    'Failed to fetch use case data',
  );
}

export async function getInsightsPageDataServer(): Promise<ApiResponse<InsightsPageData>> {
  return makeGetRequest<InsightsPageData>(
    API_ENDPOINTS.INSIGHTS_PAGE,
    'Failed to fetch insights page data',
  );
}

export async function getIntegrationPageDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.INTEGRATION_PAGE,
    'Failed to fetch integration page data',
  );
}

export async function getIntegrationsDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.INTEGRATIONS,
    'Failed to fetch integrations data',
  );
}

// Team API functions
export async function getTeamPageDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.TEAM,
    'Failed to fetch team page data',
  );
}

export async function getTeamMembersDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.TEAM_MEMBERS,
    'Failed to fetch team page data',
  );
}

// Testimonial API functions
export async function getTestimonialPageDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.TESTIMONIALS_PAGE,
    'Failed to fetch testimonial page data',
  );
}

export async function getArticleToShowNavDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.ARTICLE_TO_SHOW_NAV,
    'Failed to fetch testimonial page data',
  );
}

export async function getIntegrationTagsDataServer(): Promise<ApiResponse<IntegrationTag[]>> {
  return makeGetRequest<IntegrationTag[]>(
    API_ENDPOINTS.INTEGRATION_TAGS,
    'Failed to fetch integration tags data',
  );
}

export async function getTestimonialsToShowDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.TESTIMONIALS_TO_SHOW,
    'Failed to fetch testimonials to show data',
  );
}

export async function getAllCareersDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.CAREERS,
    'Failed to fetch all careers data',
  );
}

// Demo API functions
export async function getDemoPageDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.DEMO_PAGE,
    'Failed to fetch demo page data',
  );
}

// Contact-us API functions
export async function getContactUsPageDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.CONTACT_US,
    'Failed to fetch contact us page data',
  );
}

export async function getFaqLimitedDataServer(): Promise<ApiResponse<any>> {
  return makeGetRequest<any>(
    API_ENDPOINTS.FAQ_LIMITED,
    'Failed to fetch FAQ limited data',
  );
}

export async function getSolutionsNavbarDataServer(): Promise<ApiResponse<SolutionsNavbarData[]>> {
  return makeGetRequest<SolutionsNavbarData[]>(
    API_ENDPOINTS.SOLUTIONS_NAVBAR,
    'Failed to fetch solutions navbar data',
  );
}

export async function getUseCaseNavbarDataServer(): Promise<ApiResponse<SolutionsNavbarData[]>> {
  return makeGetRequest<SolutionsNavbarData[]>(
    API_ENDPOINTS.USE_CASE_NAVBAR,
    'Failed to fetch use case navbar data',
  );
}

export async function getResourceCompanyNavbarDataServer(): Promise<ApiResponse<ResourceCompanyNavbarData>> {
  return makeGetRequest<ResourceCompanyNavbarData>(
    API_ENDPOINTS.RESOURCE_COMPANY_NAVBAR,
    'Failed to fetch resource company navbar data',
  );
}

export async function getSocialLinksDataServer(): Promise<ApiResponse<SocialLinksData[]>> {
  return makeGetRequest<SocialLinksData[]>(
    API_ENDPOINTS.SOCIAL_LINKS,
    'Failed to fetch social links data',
  );
}

export async function getFooterTextDataServer(): Promise<ApiResponse<FooterText[]>> {
  return makeGetRequest<FooterText[]>(
    API_ENDPOINTS.FOOTER_TEXT,
    'Failed to fetch footer text data',
  );
}

export async function getLegalPageContentServer(): Promise<ApiResponse<LegalPageContentResponse[]>> {
  return makeGetRequest<LegalPageContentResponse[]>(
    API_ENDPOINTS.LEGAL_PAGE_CONTENT,
    'Failed to fetch legal page content data',
  );
}

export async function getTawkToDataServer(): Promise<ApiResponse<TawkToData>> {
  return makeGetRequest<TawkToData>(
    API_ENDPOINTS.TAWK_TO,
    'Failed to fetch tawk to data',
  );
}
