import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface title {
  id: number;
  text: string;
  highlight: boolean;
}

export interface Article {
  id: number;
  title: string;
  slug?: string;
  description: string;
  thumbnail: {
    url: string;
  };
  publishedOn: string;
  author: author;
  link: string;
  data: string;
  readTime?: string;
  video?: {
    url: string;
  };
  newsThumpnailVideo?: {
    url: string;
  };
  blogSection: any;
  blogTitle?: string;
  blogCardBackgroundImage?: {
    url: string;
  };
  articleTitle?: title[];
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

export interface author {
  name: string;
  role?: string;
  avatar?: string;
}
