import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { StaticImageData } from 'next/image';
import type { PaginationMeta } from './apiTypes';
import type { planCard, title } from './usecase';

export interface FeatureLink {
  title: string;
  href?: string;
}

export interface FooterText {
  id: number;
  footerText: string;
  path?: string;
}

export interface LegalPageContentResponse {
  id: number;
  documentId?: string;
  Title: string;
  slug: string;
  legalDocumentCategory: {
    id: number;
    documentId?: string;
    title: string;
    slug: string;
  };
}

export interface TawkToData {
  tawkToLink: string;
}

export interface NavbarIcon {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface NavbarCard {
  id: number;
  short_title: string;
  short_description: string;
  icon: NavbarIcon;
  path?: string;
}

export interface SolutionsNavbarData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  navbarCard: NavbarCard;
}

export interface ResourceCompanyNavbarData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  navbar: {
    id: number;
    resources: NavbarCard[];
    company: NavbarCard[];
  };
}

export interface SocialLinksData {
  socialMediaLink: {
    id: number;
    text: string;
    link: string;
    icon: {
      url: string;
    };
  };
}

export interface FeatureCardProps {
  smallTitle?: string;
  title?: string;
  description?: string;
  icon?: StaticImageData | string;
  showButton?: boolean;
  links?: FeatureLink[];
  mainClass?: string;
  image?: StaticImageData | string;
  showDropdown?: boolean;
  dropdownOptions?: { value: string; label: string }[];
  iconClassName?: string;
  variant?: 'default' | 'legal';
}
export interface CaseStudy {
  id?: number;
  title?: string;
  content?: BlocksContent;
  authorName?: string;
  authorTitle?: string;
  file?: { url: string };
  studyOn?: string;
  slug?: string;
}

export interface Testimonial {
  file?: any;
  id?: number;
  title?: string;
  content?: BlocksContent;
  authorName?: string;
  authorCompany?: string;
  authorAvatar?: { url: string };
  companyLogo?: { url: string };
  rating?: number;
  slug?: string;
  studyOn?: string;
  description?: BlocksContent;
  extrernalLink?: string;
  featured?: boolean;
  authorTitle?: string;
  shortTestimonial?: string;
  thumbnail?: { url: string };
}

export interface TestimonialSectionProps {
  testimonialData?: Testimonial[];
  videoTestimonialsData?: Testimonial[];
  caseStudyData?: CaseStudy[];
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  textClass?: string;
  variant?: 'solution' | 'testimonial';
  footerTitle?: string;
  footerSpanText?: string;
  footerDescription?: string;
  buttonOneText?: string;
  buttonOneLink?: string;
  borderColor?: string;
  footerExtraTitle?: string;
  paginationMeta?: PaginationMeta;
  footerMedia?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
    formats?: {
      large?: { url: string; width: number; height: number; size: number };
      small?: { url: string; width: number; height: number; size: number };
      medium?: { url: string; width: number; height: number; size: number };
      thumbnail?: { url: string; width: number; height: number; size: number };
    };
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url: string;
    previewUrl?: string | null;
    provider?: string;
    provider_metadata?: any;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}

export interface PageDetails {
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  testimonial_subtitle?: string;
  testimonial_footer?: string;
  footer_description?: string;
}
export interface ClientLogo {
  id?: number;
  logo?: { url: string };
  clientName?: string;
}

export interface TestimonialSectionProps {
  solutionData?: Testimonial[];
  headingData?: HeadingDataItem[];
  caseStudyData?: CaseStudy[];
  testimonialRating?: number;
  testimonialTitle?: string;
  testimonialDescription?: BlocksContent;
  testimonialClientName?: string;
  testimonialDesignation?: string;
  testimonialButtonLink?: string;
  testimonialButtonText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  footerImage?: string;
}

export interface PlansSectionProps {
  plansSectionData?: planCard[];
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  titleSuffix?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface TextItem {
  text: string;
}

export interface HeroSection {
  title: string;
  description?: string;
  postHeroSpan: TextItem[];
  postHeroExtraTitle: TextItem[];
  postHeroSubTitle: string;

  solutionImage?: {
    url: string;
  };
  buttonText?: string;
  buttonLink?: string;
}

export interface SolutionUsecaseCard {
  logo_description: string;
  card_title: string;
  card_description: string;
  card_image: string;
}

export interface SolutionUsecase {
  title: { text: string }[];
  tag: string;
  section_image_title: string;
  section_image_description: string;
  usecase_section_image: { url: string };
  solution_usecase_card: SolutionUsecaseCard[];
}

export interface OnboardingSectionBulletPoint {
  id: string | number;
  bullet_point_item: string;
}

export interface OnboardingSection {
  image?: { url: string };
  tag?: string;
  title: { text: string }[];
  description?: string;
  bullet_point?: OnboardingSectionBulletPoint[];
  logo?: { url: string }[];
}

export interface GeneralSection {
  title: { text: string }[];
  description?: string;
  coverImage?: { url: string };
  buttonText?: string;
  buttonLink?: string;
}

export interface LookInsideSection {
  title: { text: string }[];
  description?: string;
  solution_feature_card?: SolutionFeatureCard[];
  tag?: string;
}

export interface SolutionAdvantageItem {
  icon?: string;
  advantage_title?: string;
  description?: string;
}

export interface SolutionAdvantage {
  advantage_title?: string;
  advantage_item?: SolutionAdvantageItem[];
  title?: title[];
}

export interface AutomationSection {
  id?: number;
  tag?: string | null;
  description?: string;
  title?: {
    id: number;
    text: string;
    highlight: boolean;
  }[];
  bullet_point?: any[];
  section_image?: {
    url: string;
  };
}

export interface TechnologySection {
  titleSection?: {
    tag?: string;
    title?: title[];
    description?: string;
  };
  buttonText?: string;
  buttonLink?: string;
  media?: { url: string };
  showAnimation?: boolean;
}

export interface KnowMoreSection {
  technologySection: TechnologySection[];
}

export interface HeadingDataItem {
  testimonialCardSection?: title[];
  heroSection: HeroSection;
  navbarCard: NavbarCard;
  testimonial_section_title: { text: string }[];
  testimonial_section_subtitle: { text: string }[];
  usecasesSection: SolutionUsecase;
  aboutSection: OnboardingSection;
  plan_section_title: { text: string }[];
  generalSection: GeneralSection;
  keyFeaturesSection: LookInsideSection;
  advantagesListSection: SolutionAdvantage;
  automation_section: AutomationSection;
  technologySection: TechnologySection;
  knowMoreSection: TechnologySection;
}

export interface SolutionsHeroSectionProps {
  titlePrefix?: string;
  bannerText?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  bannerImage?: string;
}

export interface SolutionsPlatformSectionProps {
  tagText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  features?: {
    icon?: string;
    title?: string;
    description?: string;
  }[];
  platformData?: HeadingDataItem[];
  featureTabData?: HeadingDataItem[];
  solutionAdvantageData?: HeadingDataItem[];
}

export interface FreightSectionProps {
  solutionData?: {
    id: number;
    documentId: string;
    shortIntro: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: {
      id: number;
      text: string;
      highlight: boolean;
    }[];
    media: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: any | null;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface SolutionsOurCaseProps {
  ourCaseData?: SolutionUseCaseAPIResponse[];
  smallTitle?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
}

export interface SolutionFeatureCard {
  id: number;
  feature_title: string;
  description: string;
  icon: any[]; // Replace 'any' with a more specific type if available
  feature_image: any; // Replace 'any' with a more specific type if available
}

export interface TeamPageTextItem {
  text: string;
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  profileImage: { url: string };
  shortBio: string;
}

export interface TeamPageData {
  id?: number;
  Title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  teams_tag_text?: string;
  teamMemebers?: TeamMember[];
  team_text?: TeamPageTextItem[];
  footer_text?: TeamPageTextItem[];
  footer_description?: string;
  footer_button_text?: string;
  footer_button_link?: string;
  footerMedia?: {
    url: string;
  };
}

export interface SolutionUseCaseAPIResponse {
  usecasesSection: {
    description: string;
    buttonText: string;
    solution_usecase_card: {
      logo_description: string;
      card_title: string;
      card_description: string;
      details_page_link: string;
      logo: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
          large?: {
            ext: string;
            url: string;
            hash: string;
            mime: string;
            name: string;
            path: string | null;
            size: number;
            width: number;
            height: number;
            sizeInBytes: number;
          };
          small?: {
            ext: string;
            url: string;
            hash: string;
            mime: string;
            name: string;
            path: string | null;
            size: number;
            width: number;
            height: number;
            sizeInBytes: number;
          };
          medium?: {
            ext: string;
            url: string;
            hash: string;
            mime: string;
            name: string;
            path: string | null;
            size: number;
            width: number;
            height: number;
            sizeInBytes: number;
          };
          thumbnail?: {
            ext: string;
            url: string;
            hash: string;
            mime: string;
            name: string;
            path: string | null;
            size: number;
            width: number;
            height: number;
            sizeInBytes: number;
          };
        };
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
    }[];
  };
}

export interface FAQTag {
  id: number;
  documentId: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AnswerChild {
  text: string;
  type: string;
}

export interface AnswerBlock {
  type: string;
  children: AnswerChild[];
}

export interface RawFAQItem {
  id: number;
  documentId: string;
  Question: string;
  Answer: AnswerBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  faqTags: FAQTag[];
}
