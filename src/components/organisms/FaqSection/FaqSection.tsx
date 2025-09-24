import type { faqTag } from '@/types/apiTypes';
import type { RawFAQItem } from '@/types/commonTypes';
import React from 'react';
import FaqHeroSection from '@/components/molecules/FaqHeroSection/FaqHeroSection';
import FaqListingSection from '@/components/molecules/FaqListingSection/FaqListingSection';

interface FaqSectionProps {
  faqTitles: {
    title: string;
    description: string;
    ctaLink: string;
    ctaLinkText: string;
    ctaText: string;
  };
  faqData: RawFAQItem[];
  faqTags: faqTag[];
}

const FaqSection = ({ faqTitles, faqData, faqTags }: FaqSectionProps) => {
  return (
    <div className="bg-navare-green w-full flex flex-col items-center justify-center">
      <FaqHeroSection
        titlePrefix={faqTitles.title}
        description={faqTitles.description}
        ctaLink={faqTitles.ctaLink}
        ctaLinkText={faqTitles.ctaLinkText}
        ctaText={faqTitles.ctaText}
      />
      <FaqListingSection faqTags={faqTags} faqData={faqData} />
    </div>
  );
};

export default FaqSection;
