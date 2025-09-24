export interface Badge {
  text: string;
  variant?: 'default' | 'techPlatform' | 'featured' | 'carrier';
}
export interface Integration {
  id?: number;
  logo: string;
  title: string;
  description: string;
  badges?: Badge[];
  category?: string;
  image?: string;
}

export interface FeaturedIntegration {
  id?: number;
  logo: {
    url: string;
  };
  title: string;
  description: string;
  badges?: Badge[];
  category?: string;
  image?: string;
}

export type SortOption = 'name-asc' | 'name-desc';

export interface IntegrationHeroData {
  toolSectionTag: string;
  description: string;
  pageTitle: string;
  bg_image: {
    url: string;
  };
  bg_image_2: {
    url: string;
  };
  tools_heading: string;
  clientLogoSectionTitle: string;
  clientLogoSectionDescription: string;
  faq_title: string;
}

export interface Tag {
  id: number;
  tagName: string;
}

export interface IntegrationCard {
  Integration_logo?: { url: string };
  Integration_name?: string;
  description?: string;
  image?: { url: string };
  integration_tags?: Tag[];
  priority?: number;
}

export interface CardSectionData {
  cardData: IntegrationCard[];
  loading?: boolean;
  error?: Error | string | null;
  smallText?: string;
  textPrefix?: string;
  textSuffix?: string;
}

export interface Integration {
  Integration_logo?: { url: string };
  Integration_name?: string;
  description: string;
  image?: string;
  integration_tags?: Tag[];
}
