import type { Metadata } from 'next';
import type { RawFAQItem } from '@/types/commonTypes';
import React from 'react';
import FaqSection from '@/components/organisms/FaqSection/FaqSection';
import { getFaqDataServer, getFaqPageDataServer, getFaqTagsDataServer } from '@/services/apiService';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'FAQ | Navare';
  const description = 'Find answers to frequently asked questions about Navare\'s supply chain and logistics platform.';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://navareglobal.com';
  const url = `${baseUrl}/faq`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Navare',
      images: [
        {
          url: '/og_image.png',
          width: 1200,
          height: 630,
          alt: 'Navare FAQ',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og_image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
};

export const revalidate = 10;

const Page = async () => {
  const [faqDataResponse, faqPageDataResponse, faqTagsDataResponse] = await Promise.all([
    getFaqDataServer(),
    getFaqPageDataServer(),
    getFaqTagsDataServer(),
  ]);

  const faqData = faqDataResponse?.data || [];
  const faqPageData = faqPageDataResponse?.data;
  const faqTagsData = faqTagsDataResponse?.data || [];

  // Filter tags to only include those that are used by at least one FAQ
  const usedTags = faqTagsData.filter(tag =>
    faqData.some(faq =>
      faq.faqTags?.some(faqTag => faqTag.tag === tag.tag),
    ),
  );

  // Prepare FAQ titles
  const faqTitles = {
    title: faqPageData?.heroTitle,
    description: faqPageData?.description,
    ctaLink: faqPageData?.cta_link,
    ctaLinkText: faqPageData?.cta_link_text,
    ctaText: faqPageData?.cta_text,
  };

  return (
    <div className="bg-breadcrumb-nav-bg w-full flex flex-col items-center">
      <FaqSection
        faqTitles={faqTitles}
        faqData={faqData as RawFAQItem[]}
        faqTags={usedTags}
      />
    </div>
  );
};

export default Page;
