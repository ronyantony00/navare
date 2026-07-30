import React from 'react';
import ImpactCard from '@/components/atoms/ImpactCard/ImpactCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';

export interface LandingPageOurImpactProps {
  smallText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  impactData?: any[];
}

const LandingPageOurImpact = ({ smallText, titlePrefix, titleHighlight, impactData }: LandingPageOurImpactProps) => {
  return (
    <div className="relative w-full max-w-maxwidth flex flex-col items-center justify-center">
      <div className="absolute top-space-50 -left-space-160 size-space-300 sm:bg-blue-circle-bg bg-landing-our-impact-bg/30 blur-3xl opacity-30 rounded-full" />
      <div className="relative max-w-maxwidth w-full flex flex-col gap-space-24 lg:gap-space-24 section-padding-y section-padding-x z-20">
        <TextCombo
          smallText={smallText}
          title={titlePrefix}
          spanText={titleHighlight}
          className="base:max-w-pct-040 xl:max-w-pct-050 lg:max-w-pct-090"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:gap-space-30 gap-space-20">
          {impactData?.map((card, index) => (
            <ImpactCard key={index} {...card} isUp={index % 2 === 0} />
          ))}
        </div>
        <span className="absolute sm:bottom-0 top-pct-050 -right-space-10 bg-landing-our-impact-bg/30 size-space-200 rounded-full blur-3xl opacity-30" />
      </div>
    </div>
  );
};

export default LandingPageOurImpact;
