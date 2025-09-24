type Messages = typeof import('../locales/en.json'); // Use type safe message keys with `next-intl`

declare interface IntlMessages extends Messages {}

interface JobContentParagraph {
  type: 'paragraph';
  text: string;
}

interface JobContentBulletList {
  type: 'bulletList';
  items: string[];
}

type JobContent = JobContentParagraph | JobContentBulletList;

interface Job {
  id: number;
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: string;
  jobLevel: string;
  linkedInLink?: string;
  slug: string;
  jobDescription: JobContent[];
  details: JobContent[];
  others: JobContent[];
}
