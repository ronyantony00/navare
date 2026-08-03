'use client';
import Image from 'next/image';
import React from 'react';
import RiveNavigation from '@/components/atoms/RiveAnimation/RiveAnimation';
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

const solutionLinkMap: Record<string, string> = {
  NAVONETMS: 'solutions/navonetms',
  NAVONECMS: 'solutions/navonecms',
  NAVBRIDGE: 'solutions/navbridge',
  NAVSCAN: 'solutions/navscan',
  CUSTOMISED: 'solutions/customised',
};

const LandingPageServiceSection = ({ smallText, titlePrefix, titleHighlight, solutionSectionCard }: LandingPageServiceSectionProps) => {

  const getSolutionLink = (link: string | null) => {
    if (!link) return '';
    return solutionLinkMap[link] || `solutions/${link.toLowerCase()}`;
  };

  return (
    <div className="relative w-full max-w-maxwidth flex flex-col">
      <div className="lg:pb-space-00 lg:pt-space-20 py-space-16 section-padding-x flex flex-col lg:items-start items-center lg:gap-space-00 gap-space-12 z-20 overflow-hidden">
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
              link={getSolutionLink(solution.link)}
            />
          ))}
        </div>
      </div>
      {/* Shorter frame + TopCenter cover crops empty artboard space under the cards */}
      <div className="hidden lg:block w-full overflow-hidden aspect-[12/5] -mt-space-02">
        <RiveNavigation
          src="/assets/animation/rive/archived_navera (13) 2.riv"
          className="w-full h-full"
          solutionSectionCard={solutionSectionCard}
        />
      </div>
    </div>
  );
};

export default LandingPageServiceSection;
