export interface EmailItem {
  label: string;
  email_id: string;
}

export interface PhoneContactItem {
  label: string;
  phone: string;
}

export interface Office {
  tag: string;
  address: string;
  email: EmailItem[];
  phone_contact: PhoneContactItem[];
}

export interface ContactInfoSection {
  id: number;
  country_name: string;
  offices: Office[];
}

export interface TitleSection {
  id: number;
  tag: string;
  title: string;
  description: string;
}

export interface TestimonialTitleSection {
  id: number;
  sectionDescription: string;
  sectionTitle: string;
}

export interface FaqSectionTitle {
  id: number;
  text: string;
  highlight: boolean;
}

export interface ContactInfoType {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  contact_info_section: ContactInfoSection[];
  titleSection: TitleSection;
  testimonialTitleSection: TestimonialTitleSection;
  faqSectionTitle: FaqSectionTitle[];
}

export interface ContactInfo {
  id: number;
  title: string;
  info: string;
}
