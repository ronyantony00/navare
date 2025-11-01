'use client';
import type { LegalDocument } from '@/types/apiTypes';
import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import { formatDateToLongString } from '@/utils/textUtils';
import { generatePDF } from '@/utils/utilFunctions/pdfGenerator';

interface TermsOfUseProps {
  pageDetails: LegalDocument[];
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ pageDetails }) => {
  const t = useTranslations('TermsOfUseSection');
  const pageContent = pageDetails?.[0];

  // console.warn('pageContent', pageContent?.updatedAt);

  const handleDownloadPDF = () => {
    if (!pageContent) {
      return;
    }

    // Use the utility function to generate PDF
    generatePDF(
      {
        title: pageContent.Title,
        content: pageContent.content,
      },
      'terms-of-use.pdf',
    );
  };

  if (!pageContent || !pageContent.content || pageContent.content.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen section-title w-full">
        <span>{t('no_content_found')}</span>
      </div>
    );
  }

  return (
    <div className="max-w-maxwidth mx-auto min-h-screen flex flex-col md:gap-space-15 gap-space-10 section-padding-y section-padding-x">
      <div className="flex flex-col">
        <TextCombo
          title={pageContent.Title}
          keyText=""
          valueText=""
          titleClass="hero-title -ml-space-02 lg:-ml-space-03"
          className="gap-space-04"
        />
        <div className="flex gap-space-02 mb-space-16">
          <span className="very-small-content font-bold text-desc-text">Last Updated at:</span>
          <span className="very-small-content text-desc-text">{formatDateToLongString(pageContent?.updatedAt || '')}</span>
        </div>
        <Button variant="primary" arrow arrowClassName="size-space-05" text={t('download')} mainClass="w-fit gap-space-05" onClick={handleDownloadPDF} />
      </div>
      <div className="">
        <RichTextRenderer content={pageContent.content} />
      </div>
    </div>
  );
};

export default TermsOfUse;
