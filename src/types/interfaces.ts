import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { title } from './usecase';

export interface faqType {
  id: number;
  Question: string;
  Answer: BlocksContent | string;
  faqTags: {
    id: number;
    tag: string;
  }[];
}

export interface ClientLogo {
  id: number;
  clientName: string;
  logo: string | { url: string };
}

// About Us Interface
export interface Metric {
  id: number;
  metric_value: string;
  metric_description: string;
}

export interface Highlight {
  title: string;
  icon: { url: string } | string;
}

export interface benefit {
  id: number;
  title: string;
}

export interface AboutUs {
  title: string;
  heroSection: {
    description: string;
    buttonText?: string;
    buttonLink?: string;
  };
  testimonial: {
    title: string;
    authorName: string;
    authorTitle: string;
    authorCompany: string;
    companyLogo: { url: string };
    content: BlocksContent | string;
    shortTestimonial: string;
  };
  our_vision: {
    ButtonText: string;
    ButtonLink: string;
    metric: Metric[];
    tag: string;
    title: title[];
    description: string;
    image: { url: string };
  };
  testimonial_title: title[];
  companyTestimonial: {
    authorName: string;
    designation: string;
    title: string;
    testimonial: string;
    avatar?: { url: string };
    backgroundImage?: { url: string };
  };
  whoWeAre: {
    title_section: {
      tag: string;
      title: title[];
      description: string;
    };
    highlights: Highlight[];
    benefits: benefit[];
    mainImage: { url: string };
    subImage: { url: string };
    mainTextOnImage: string;
    smallTextOnImage: string;
  };
  title_section: {
    tag: string;
    title: title[];
    description: string;
  };
}

export interface WhoWeAre {
  title_section: {
    tag: string;
    title: title[];
    description: string;
  };
  highlights: Highlight[];
  benefits: benefit[];
  mainImage: { url: string };
  subImage: { url: string };
  mainTextOnImage: string;
  smallTextOnImage: string;
}

export interface FilterObject {
  id: number;
  jobLocation: string;
  count?: number;
  // job_locations?: {
  //   id?: number;
  //   jobLocation?: string;
  // };
}
