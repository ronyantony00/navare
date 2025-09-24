import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { StaticImageData } from 'next/image';

interface MediaObject {
  url: string;
}

export interface CardContent {
  id: number;
  icon: MediaObject;
  title: string;
  content: string;
};

export interface titleObject {
  id: number;
  text: string;
  highlight: boolean;
}

export interface AnalyticsCardData {
  id: number;
  variant: 'textRight' | 'textLeft';
  title: {
    titlePrefix?: string;
    titleHighlight: string;
    titleSuffix?: string;
  };
  content: string;
  media: MediaObject;
};

export interface planCard {
  id?: number;
  plan_duration?: string;
  planType?: string;
  planTier?: string;
  planBadge?: string;
  planTypeName?: string;
  planImage?: StaticImageData;
  description?: string;
  features?: string[];
  buttonText?: string;
  buttonLink?: string;
  mainClass?: string;
}

export interface PlansSectionProps {
  title: {
    titlePrefix?: string;
    titleHighlight: string;
    titleSuffix?: string;
  };
  buttonText: string;
  buttonLink: string;
  Plans: planCard[];
}

export interface Testimonial {
  id: number;
  title: string;
  content: BlocksContent;
  authorName: string;
  authorTitle: string;
  companyLogo: { url: string };
  rating: number;
  slug: string;
  studyOn: string;
}

export interface TestimonialData {
  id: number;
  title: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  rating: number;
  content: BlocksContent;
  companyLogo: {
    url: string;
  } | null;
}

export interface title {
  id: number;
  text: string;
  highlight: boolean;
}

export interface feature {
  id: number;
  icon: { url: string };
  title: string;
  content: string;
}

export interface featureCard {
  id: number;
  title: string;
  content: string;
  icon: string | { url: string };
}

export interface advantage {
  id: number;
  title: title[];
  content: string;
  media: { url: string };
}

export interface productFeature {
  id: number;
  featureName: string;
}

export interface productPlan {
  id: number;
  tag: string;
  description: string;
  media: { url: string } | null;
  planName: string;
  product_features: productFeature[];
}

export interface apiSectionCard {
  title: title[];
  shortIntro: string;
  media: { url: string };
}

export interface useCaseData {
  id: number;
  slug: string;
  heroSection: {
    bookDemoLink: string;
    heroMedia: { url: string };
    postHeroSubTitle: string;
    postHeroTitle: title[];
    postKeyWord: string;
  };
  featureSection: feature[];
  advantagesSection: advantage[];
  plansTitle: title[];
  productPlans: productPlan[];
  testimonialTitle: title[];
  challengesSection: {
    title: title[];
    description: string;
  };
  solutionSection: {
    title: title[];
    mainDescription: string;
    subDescription: string;
    mainImage: { url: string };
    subImage: { url: string };
  };
  footerSection: {
    title: title[];
    description: string;
    buttonText?: string;
    buttonLink?: string;
  };
  advantagesTitleSection: {
    title: title[];
    tag: string;
  };
  FeatureSectionTitle: {
    title: title[];
    description: string;
  };
}
