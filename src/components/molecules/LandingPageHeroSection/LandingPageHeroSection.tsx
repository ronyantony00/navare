import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';

export interface LandingPageHeroSectionProps {
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  buttonOneText?: string;
  subKey?: string;
  subValue?: string;
  linkUrl?: string;
}

const LandingPageHeroSection = ({ titlePrefix, description, buttonOneText, subKey, subValue }: LandingPageHeroSectionProps) => {
  return (
    <div className="max-w-maxwidth section-padding-x w-full h-full base:min-h-max-height flex flex-col items-start md:justify-center justify-start gap-space-30 section-padding-y">
      <TextCombo
        title={titlePrefix}
        description={description}
        buttonOneText={buttonOneText}
        buttonOneLink="/schedule-demo"
        linkPrefixText={subKey}
        keyText={subKey}
        valueText={subValue}
        className="items-start 2md:max-w-pct-080 xl:max-w-pct-060"
        titleClass="hero-title"
        descClass="sm:max-w-pct-070 text-desc-text"
      />
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={ExternalMediaConstants.LandingHeroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/backgroundImage/landing-hero-fallback.svg"
      />
    </div>
  );
};

export default LandingPageHeroSection;
