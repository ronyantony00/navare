import type { legalCard } from '@/types/apiTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import FeatureCard from '@/components/atoms/FeatureCard/FeatureCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import { sanitizeLegalPlainText } from '@/utils/utilFunctions/sanitizeLegalContent';

interface LegalSectionProps {
  title: string;
  description: string;
  legalCards: legalCard[];
  footerTitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

const LegalSection = ({ title, description, legalCards, footerTitle, buttonText, buttonLink }: LegalSectionProps) => {
  const t = useTranslations('LegalSection');
  const safeTitle = sanitizeLegalPlainText(title) || t('fallbackTitle');
  const safeDescription = sanitizeLegalPlainText(description) || t('fallbackDescription');
  const safeFooterTitle = sanitizeLegalPlainText(footerTitle) || t('fallbackFooterTitle');

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative base:min-h-max-height w-full flex flex-col items-center overflow-hidden justify-center text-center">
        <div className="absolute -bottom-space-20 left-0 w-full blur-2xl h-space-50 bg-landing-hero-bg-color opacity-60 z-20" />
        {/* Background Image */}
        <Image
          src={ImageConstants.LegalHubBg}
          alt="Legal Hub"
          fill
          priority={true}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full legal-hub-bg z-10" />
        <div className="section-padding-x section-padding-y w-full max-w-maxwidth flex flex-col items-center justify-center z-20">
          <div className="flex flex-col  gap-space-04 py-space-30">
            <TextCombo
              title={safeTitle}
              description={safeDescription}
              className="items-start justify-start text-left max-w-pct-090"
              titleClass="hero-title"
              descClass="lg:max-w-pct-060 sm:max-w-pct-080 pl-space-02 2md:pl-space-03"
            />
          </div>
        </div>
      </div>
      <div className="relative z-50 w-full flex flex-col items-center justify-center border-t border-border-color">
        <div className="relative z-30 w-full max-w-maxwidth flex flex-col items-center justify-center section-padding-x pb-space-30 2md:pb-space-40 xl:pb-space-50">
          <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {Array.isArray(legalCards) && legalCards.map(legalCategory => (
              <FeatureCard
                key={legalCategory.id}
                icon={typeof legalCategory.icon === 'string' ? legalCategory.icon : getImageUrl(legalCategory.icon?.url) || ''}
                title={legalCategory.title || ''}
                description=""
                links={legalCategory.linkSection || []}
                showButton={false}
                mainClass="gap-space-05 min-h-legal-card-height flex flex-col items-start pb-space-15 md:min-h-space-200 border border-border-color"
                showDropdown={false}
                variant="legal"
                iconClassName="2md:h-space-35 2md:w-space-35 h-space-25 w-space-25"
              />
            ))}
          </div>
          <div className="relative z-30 overflow-hidden w-full flex 2md:flex-row flex-col gap-space-10 justify-between items-center py-space-30 px-space-15 md:px-space-40 border border-border-color stories-card-bg">
            <div className="absolute z-10 w-space-80 h-space-200 right-space-50 md:-bottom-pct-080 -bottom-pct-070 rotate-130 rounded-full bg-testimonial-card-blur opacity-30 blur-3xl "></div>
            <div className="card-title text-subtle-desc text-center">{safeFooterTitle}</div>
            <Button text={buttonText || t('fallbackButtonText')} animation variant="outline" arrow={true} mainClass="relative text-subtle-desc z-30" link={buttonLink || '/faq'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalSection;
