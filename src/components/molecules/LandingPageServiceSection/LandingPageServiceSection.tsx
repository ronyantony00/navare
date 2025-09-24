'use client';
import Image from 'next/image';
import React from 'react';
import RiveNavigation from '@/components/atoms/RiveNavigation/RiveNavigation';
import ServiceCard from '@/components/atoms/ServiceCard/ServiceCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/urlConstructor';

export interface SolutionCard {
  id: number;
  solution_name: string;
  description: string;
  link: string | null;
  logo: {
    url: string;
  } | null;
}

export interface LandingPageServiceSectionProps {
  smallText: string;
  titlePrefix: string;
  titleHighlight?: string;
  solutionSectionCard: SolutionCard[];
}

const LandingPageServiceSection = ({ smallText, titlePrefix, titleHighlight, solutionSectionCard }: LandingPageServiceSectionProps) => {
  return (
    <div className="relative w-full max-w-maxwidth flex flex-col">
      <div className="lg:pb-space-00 lg:pt-space-30 py-space-20 section-padding-x flex flex-col lg:items-start items-center lg:gap-space-00 gap-space-12 z-20 overflow-hidden">
        <div className="absolute lg:block hidden top-space-50 -left-space-200 size-space-300 bg-blue-circle-bg blur-3xl opacity-30 rounded-full" />
        <Image src={ImageConstants.ServiceGreenCircleBg} width={1000} height={1000} alt="Service Section Mobile Background" className="lg:hidden absolute -top-space-125 left-0 w-full h-full opacity-90 object-cover" />
        <Image src={ImageConstants.ServiceSectionMobileBg} width={1000} height={1000} alt="Service Section Mobile Background" className="sm:hidden absolute top-0 left-0 w-full h-full object-cover" />
        <TextCombo
          smallText={smallText}
          title={titlePrefix}
          spanText={titleHighlight}
          textClass=""
          className="lg:items-start lg:text-left text-center lg:max-w-pct-055 sm:max-w-pct-060 2xs:max-w-pct-080 relative z-20"
        />
        <div className="lg:hidden flex flex-col items-center self-center justify-center gap-space-20 relative z-20">
          {solutionSectionCard?.map(solution => (
            <ServiceCard
              key={solution.id}
              className={solution.solution_name === 'Customised Solution' ? 'p-space-01 gradient-border-corners' : 'border border-border-color'}
              title={solution.solution_name}
              description={solution.description}
              image={getImageUrl(solution?.logo?.url || '')}
              link={solution.link || ''}
            />
          ))}
        </div>
      </div>
      <RiveNavigation className="h-fit aspect-video hidden lg:block" />
    </div>
  );
};

export default LandingPageServiceSection;
