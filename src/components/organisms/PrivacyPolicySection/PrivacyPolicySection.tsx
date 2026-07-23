'use client';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import Spinner from '@/components/atoms/Spinner/Spinner';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import { API_ENDPOINTS } from '@/constants/apiConstants/apiEndpoints';
import { useFetch } from '@/hooks/useFetch';
import { sanitizeLegalContent, sanitizeLegalPlainText } from '@/utils/utilFunctions/sanitizeLegalContent';

const PrivacyPolicySection = () => {
  const t = useTranslations('PrivacyPolicySection');

  const { data: pageDetails, loading } = useFetch<any>(API_ENDPOINTS.PRIVACY_POLICY);

  const pageContent = useMemo(() => {
    const raw = pageDetails?.[0];
    if (!raw) {
      return undefined;
    }

    return {
      ...raw,
      Title: sanitizeLegalPlainText(raw.Title) || t('header'),
      content: sanitizeLegalContent(raw.content),
    };
  }, [pageDetails, t]);

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
          buttonOneText={t('download')}
          titleClass="text-size-3xl-3"
          className="gap-space-16"
        />
      </div>
      <div className="">
        <RichTextRenderer content={pageContent.content} />
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
