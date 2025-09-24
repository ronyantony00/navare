import type { legalCard } from '@/types/apiTypes';
import React from 'react';
import LegalSection from '@/components/molecules/LegalSection/LegalSection';
import { getLegalPageContentServer, getLegalPageDataServer, getLegalPageListServer } from '@/services/apiService';
import { mergeCategoriesWithContent } from '@/utils/utilFunctions/legalDocumentCategorizer';

export const revalidate = 10;

const page = async () => {
  const [legalPageDataResponse, legalPageListResponse, legalPageContentResponse] = await Promise.all([
    getLegalPageDataServer(),
    getLegalPageListServer(),
    getLegalPageContentServer(),
  ]);

  const legalPageData = legalPageDataResponse?.data;
  const legalPageList = legalPageListResponse?.data;
  const legalPageContent = legalPageContentResponse?.data;
  let legalCards: legalCard[] = [];

  // Merge categories (with icon/order) and content (Title+slug by category)
  if (Array.isArray(legalPageList)) {
    legalCards = mergeCategoriesWithContent(legalPageList, legalPageContent || []);
  }

  return (
    <div className="w-full flex flex-col items-center bg-landing-hero-bg-color">
      <LegalSection
        title={legalPageData?.hero_title || ''}
        description={legalPageData?.hero_subtitle || ''}
        legalCards={legalCards}
        footerTitle={legalPageData?.footerSection?.title || ''}
        buttonText={legalPageData?.footerSection?.buttonText || ''}
      />
    </div>
  );
};

export default page;
