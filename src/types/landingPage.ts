export interface Media {
  url: string;
  // other fields can be added as needed
}

export interface Button {
  button_label: string;
  button_link: string;
}

export interface KeyValue {
  key: string;
}

export interface TitlePart {
  id?: number;
  text: string;
  highlight: boolean;
}

export interface HeroSection {
  hero_title: TitlePart[];
  hero_subtitle: string;
  bg_media?: Media;
  button?: Button;
  key_value_list?: KeyValue;
}

export interface SectionTitle {
  text: string;
  highlight: boolean;
}

export interface SolutionSection {
  tag?: string;
  section_title?: SectionTitle;
}

export interface HelpComponent {
  help_text?: string;
  phone_or_email?: string;
}

export interface SolutionSystem {
  id: number;
  title: string;
  link?: string;
  description: string;
}

export interface MetricNonRepeat {
  metric_value?: string;
  metric_description?: string;
}

export interface WhyUsSection {
  images?: Media[];
  section_title?: TitlePart[];
  help_component?: HelpComponent;
  our_solution_systems?: SolutionSystem[];
  button?: Button;
  metric_component_non_repeat?: MetricNonRepeat;
}

export interface IntegrationSection {
  section_title?: TitlePart[];
}

export interface NewsAndInsightsSection {
  tag?: string;
  title?: TitlePart[];
  news_and_insights?: unknown[]; // Replace unknown with specific type when available
}

export interface TestimonialComponent {
  tag?: string;
  description?: string;
  title?: TitlePart[];
}

export interface MetricRepeatable {
  metric_value: string;
  metric_title: string;
  description: string;
}

export interface CtaButton {
  button_label?: string;
}

export interface CtaSection {
  subtitle?: string;
  cta_button?: CtaButton;
  title?: TitlePart[];
  bg_image?: {
    url: string;
    formats?: {
      large?: { url?: string };
      medium?: { url?: string };
      small?: { url?: string };
    };
  };
}

export interface ImpactSection {
  tag?: string;
  title?: TitlePart[];
  metric_component_repeatable?: MetricRepeatable[];
  cta_section?: CtaSection;
}

export interface LandingPageData {
  data: any;
  hero_section?: HeroSection;
  solution_section?: SolutionSection;
  why_us_section?: WhyUsSection;
  Integration_section?: IntegrationSection;
  news_and_insights?: NewsAndInsightsSection;
  testimonial_component?: TestimonialComponent;
  impact_section?: ImpactSection;
  key_value_list?: string;

}

export interface Testiplandinmonial {
  content: string;
  authorName: string;
  authorCompany: string;
  // add more fields if necessary
}
