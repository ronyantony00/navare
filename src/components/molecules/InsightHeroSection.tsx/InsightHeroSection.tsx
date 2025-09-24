import Image from 'next/image';
import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface HeroSectionProps {
  heroTitle?: string;
  description?: string;
  heroImage?: string;
}

const InsightHeroSection = ({ heroTitle, description }: HeroSectionProps) => {
  return (
    <div className="w-full relative">
      <video
        src={ExternalMediaConstants.InsightsHeroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover absolute inset-0 z-0 opacity-50"
        poster="/assets/backgroundImage/insights-hero-fallback.svg"
      />
      <div className="insights-hero-shade absolute inset-0 z-10"></div>
      <div className="w-full h-full absolute inset-0 bg-navare-green opacity-70 z-10"></div>
      <div className="flex flex-col gap-space-20 2md:flex-row 2md:justify-between max-w-maxwidth mx-auto base:min-h-max-height section-padding-x section-padding-y">
        <div className="max-w-pct-050 flex z-10">
          <Image src={ImageConstants.InsightHeroIcon} width={163} height={284} alt="hero-image" className="z-10 w-space-50 md:w-space-80" />
          <div className="flex flex-col -ml-space-35">
            <TextCombo
              title={heroTitle}
              className="text-white my-auto"
              titleClass="hero-title"
            />
          </div>
        </div>
        <div className="border-l h-fit 2md:ml-space-80 pl-space-23 max-w-space-225 text-placeholder-text z-10 md:my-auto primary-content">
          {description}
        </div>
      </div>
    </div>
  );
};

export default InsightHeroSection;
