'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import Spinner from '@/components/atoms/Spinner/Spinner';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import { API_ENDPOINTS } from '@/constants/apiConstants/apiEndpoints';
import { useFetch } from '@/hooks/useFetch';

const PrivacyPolicySection = () => {
  const t = useTranslations('PrivacyPolicySection');

  const { data: pageDetails, loading } = useFetch<any>(API_ENDPOINTS.PRIVACY_POLICY);

  const pageContent = pageDetails?.[0];
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Spinner />
      </div>
    );
  }
  if (!pageContent || !pageContent.content || pageContent.content.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <span>{t('no_content_found')}</span>
      </div>
    );
  }
  return (
    <div className="max-w-maxwidth mx-auto min-h-screen flex flex-col md:gap-space-15 gap-space-10 md:py-space-30 py-space-20 px-space-15 md:px-space-40">
      <div className="flex flex-col gap-space-10">
        <TextCombo
          title={pageContent.Title}
          keyText="Say Goodbye to:"
          valueText="Excel Spreadsheet"
          buttonOneText={t('download')}
          titleClass="text-size-3xl-3"
          className="gap-space-16"
        />
        {/* <div className="text-size-3xs font-medium leading-description flex gap-space-04 md:flex-row flex-col">
          {t('lastModifiedLabel')}
          <span className="text-size-3xs font-normal leading-description">
            {pageContent.lastUpdated && pageContent.lastUpdated.trim() ? pageContent.lastUpdated : termsData.header.lastModified}
          </span>
        </div> */}
      </div>
      <div className="">
        <RichTextRenderer content={pageContent.content} />
      </div>
      {/* <div className="text-size-3xs leading-description ">
        <Button variant="primary" text={t('download')} arrow={true} mainClass="size-fit" arrowClassName="size-space-05" />
      </div> */}
    </div>
  );
};

export default PrivacyPolicySection;
