// src\constants\apiConstants\apiEndpoints.ts
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  CAREERS: '/api/careers?populate=*',
  CAREERS_LISTING: '/api/careers?pagination[page]=1&pagination[pageSize]=4&populate=*',
  // CAREERS_PAGE: '/api/career-page?populate=*',
  CAREERS_PAGE: '/api/career-page?populate[job_list_section_title][populate]=*&populate[hero_media][populate]=*&populate[formTitle][populate]=*', // Explicitly populate the nested title component
  // CAREERS_PAGE: '/api/career-page?populate[job_list_section_title][populate]=title&populate=hero_media&populate=formTitle',
  JOB_OPENING_FORM: '/api/job-opening-subscription-requests',
  PRIVACY_POLICY: '/api/legal-documents?filters[documentType][$eq]=privacy-policy&populate=*',
  ABOUT_US: '/api/about?populate[heroSection][populate]=*&populate[our_vision][populate]=*&populate[whoWeAre][populate][highlights][populate]=*&populate[testimonial_title][populate]=*&populate[companyTestimonial][populate]=*',
  ABOUT_US_WHO_WE_ARE: '/api/about?populate[whoWeAre][populate][title_section][populate]=*',
  WHO_WE_ARE: '/api/about?populate[whoWeAre][populate]=*',
  ABOUT_US_BENEFITS: '/api/about?populate[whoWeAre][populate][benefits][populate]=*',
  ABOUT_US_OUR_VISION: '/api/about?populate[heroSection][populate]=*',
  FAQ: '/api/frequently-asked-questions?populate=*',
  FAQ_LIMITED: '/api/frequently-asked-questions?pagination[page]=1&pagination[pageSize]=8&populate=*',
  FAQ_PAGE: '/api/faq-page?populate=*',
  CONTACT_US: '/api/contact-us-page?populate[contact_info_section][populate]=*&populate[titleSection][populate]=*&populate[testimonialTitleSection][populate]=*&populate[faqSectionTitle][populate]=*',
  CONTACT_US_FORM: '/api/contact-submissions?populate=*',
  TESTIMONIALS: '/api/testimonials?populate=*&sort=priority:ASC',
  VIDEO_TESTIMONIALS: '/api/testimonials?filters[thumbnailVideo][$notNull]=true&populate=thumbnailVideo&sort=priority:asc',
  USECASE_TESTIMONIALS: '/api/testimonials?pagination[page]=1&pagination[pageSize]=6&populate=*',
  TESTIMONIALS_TO_SHOW: '/api/testimonials?pagination[page]=1&pagination[pageSize]=9&populate=*',
  ARTICLE_TO_SHOW_NAV: '/api/articles?populate=*&sort=publishedOn:desc',
  TESTIMONIALS_PAGE: '/api/testimonial-page?populate=*',
  CLIENT_LOGO: '/api/client-logos?sort=priority:ASC&populate=*&pagination[pageSize]=50',
  CASE_STUDY: '/api/case-studies?populate=*',
  SOLUTIONS: '/api/solutions?',
  PRODUCT_PLANS: '/api/product-plans?populate=*',
  API_SECTION: '/api/api-section-card?populate=*',
  LANDING_PAGE: '/api/home-page?populate=*',
  INTEGRATION_PAGE: '/api/integration-page?populate=*',
  INTEGRATIONS: '/api/integrations?populate=*',
  ARTICLES: '/api/articles?populate=*&sort=publishedOn:desc',
  NEWS: '/api/articles?populate=*&sort=publishedOn:desc&filters[articleType][$eq]=news',
  BLOGS: '/api/articles?populate=*&sort=publishedOn:desc&filters[articleType][$eq]=blog',
  INSIGHTS_PAGE: '/api/news-and-insight?populate=*',
  SCHEDULE_DEMO_FORM: '/api/demo-booking-requests',
  INTEGRATION_TAGS: '/api/integration-tags?populate=*',
  DEMO_PAGE: '/api/demo-page?populate=*',
  TEAM: '/api/team-page?populate=*',
  TEAM_MEMBERS: '/api/team-members?populate=*&sort=priorityOrder:ASC',
  ARTICLE_CATEGORIES: '/api/categories?populate=*',
  LANDINGPAGE_HERO: `/api/home-page?populate[heroSection][populate]=*&populate[servicesSection][populate][title][populate]=*&populate[servicesSection][populate][solution_card][populate]=*&populate[whyUsSection][populate]=*&populate[integrationSection][populate]=*&populate[insightsSection][populate]=*&populate[testimonialSection][populate]=*&populate[impactSection][populate]=*`,
  LANDINGPAGE_FOOTER: `/api/home-page?populate[impactSection][populate][footerSection][populate]=*`,
  LANDINGPAGE_GENERAL: `/api/home-page?populate[generalImage][populate]=*`,
  LANDINGPAGE_KEY_VALUE: `/api/home-page?populate[heroSection][populate][key_value_list][populate]=*`,
  LEGAL_PAGE: `/api/legal-page?populate=*`,
  LEGAL_PAGE_CONTENT: '/api/legal-documents?fields=Title,slug&populate[legalDocumentCategory][fields]=title,slug',
  LEGAL_PAGE_LIST: `/api/legal-document-categories?populate=*`,
  JOB_LOCATIONS: `/api/job-locations?populate=*`,
  FAQ_TAGS: `/api/faq-tags?populate=*`,
  SOLUTIONS_NAVBAR: '/api/solutions?populate[navbarCard][populate]=*&pagination[pageSize]=8',
  USE_CASE_NAVBAR: '/api/use-cases?populate[navbarCard][populate]=*&pagination[pageSize]=8',
  RESOURCE_COMPANY_NAVBAR: '/api/navbar?populate[navbar][populate][resources][populate]=*&populate[navbar][populate][company][populate]=*',
  SOCIAL_LINKS: '/api/social-medias?populate[socialMediaLink][populate]=*',
  FOOTER_TEXT: '/api/footer-texts?populate=*',
  TAWK_TO: '/api/tawk-to?populate=*',
  LATEST_ARTICLES_3: '/api/articles?pagination[page]=1&pagination[pageSize]=3&populate=*&sort=publishedOn:desc',

  TERMS_OF_USE: (slug: string) => `/api/legal-documents?filters[slug][$eq]=${slug}&populate=*`,

  CAREER_ENDPOINT: (slug: string) => `/api/careers?filters[slug][$eq]=${slug}&populate[department]=true&populate[employmentType]=true&populate[job_level]=true&populate[job_locations]=true`,

  USE_CASE_BY_SLUG: (slug: string) => (
    `/api/use-cases?filters[slug][$eq]=${slug}&populate[heroSection][populate]=*&populate[featureSection][populate]=*&populate[otherUsecases][populate]=*&populate[challengesSection][populate]=*&populate[solutionSection][populate]=*&populate[footerSection][populate]=*&populate[testimonialSection][populate]=*&populate[otherUsecasesTitleSection][populate]=*&populate[FeatureSectionTitle][populate]=*&populate[navbarCard][populate]=*`
  ),
  BLOG_DETAIL: (slug: string) => (
    `/api/articles?filters[slug][$eq]=${slug}&populate[blogSection][populate]=*&populate=author&populate[articleTitle]=*`
  ),
  TESTIMONIAL_DETAIL: (slug: string) => (
    `/api/testimonials?filters[slug][$eq]=${slug}&populate=*`
  ),
  SOLUTIONS_TESTIMONIALS: (slug: string) => (
    `/api/testimonials?populate=*&filters[solutions_tags][solutionName][$eq]=${slug}&sort=priority:ASC`
  ),
  USE_CASE_TESTIMONIALS: (slug: string) => (
    `/api/testimonials?pagination[page]=1&pagination[pageSize]=6&populate=*&filters[use_case_tags][useCaseName][$eq]=${slug}&sort=priority:ASC`
  ),
  ARTICLES_TO_SHOW: (count: number) => (
    `/api/articles?pagination[page]=1&pagination[pageSize]=${count}&populate=*&sort=publishedOn:desc`
  ),
  ARTICLES_EXCLUDE_BLOG: (blogName: string, count: number) => (
    `/api/articles?pagination[page]=1&pagination[pageSize]=${count}&populate=*&sort=publishedOn:desc&filters[slug][$ne]=${blogName}`
  ),
  CAREER_DETAIL: (slug: string) => (
    `/api/careers?filters[slug][$eq]=${slug}&populate[department]=true&populate[employmentType]=true&populate[job_level]=true`
  ),
};
