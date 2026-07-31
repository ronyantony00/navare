import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';

interface FaqHeroSectionProps {
  titlePrefix?: string;
  description?: string;
  icon?: string;
  ctaText?: string;
  ctaLinkText?: string;
  ctaLink?: string;
  heroMedia?: string;
}

const FaqHeroSection = ({ titlePrefix, description, ctaText, ctaLinkText, ctaLink }: FaqHeroSectionProps) => {
  const t = useTranslations('FaqHeroSection');

  return (
    <div className="relative w-full">
      <video
        src={ExternalMediaConstants.FaqHeroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover absolute inset-0 z-0 opacity-50"
        poster="/assets/backgroundImage/faq-hero-fallback.svg"
      />
      <div className="w-full h-full absolute inset-0 bg-navare-green opacity-70 z-10"></div>
      <div className="w-full flex flex-col items-center justify-center max-w-maxwidth mx-auto base:min-h-max-height section-padding-x py-space-20 md:section-padding-y">
        <div className="size-full flex flex-col items-center justify-center gap-space-12">
          <TextCombo
            title={titlePrefix}
            description={description}
            spanClass="text-primary"
            descClass="primary-content sm:max-w-pct-085 mx-auto"
            className="max-w-pct-080 2md:max-w-pct-060 xl:max-w-pct-080 base:max-w-pct-060 text-center mx-auto z-10"
            titleClass="hero-title"
          />
          <div className="primary-content text-center z-10 px-space-10">
            <span className="text-subtle-desc">{ctaText || t('still_have_question')}</span>
            {' '}
            <span className="text-primary underline">
              <Link href={ctaLink || '/contact-us'}>{ctaLinkText || t('contact_us')}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqHeroSection;
