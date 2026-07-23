'use client';
import type { TeamMember, TeamPageData } from '@/types/commonTypes';
import Image from 'next/image';
import React from 'react';
import TeamPageFooter from '@/components/molecules/TeamPageFooter/TeamPageFooter';
import TeamPageHeroSection from '@/components/molecules/TeamPageHeroSection/TeamPageHeroSection';
import TeamPageListingSection from '@/components/molecules/TeamPageListingSection/TeamPageListingSection';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface TeamSectionProps {
  teamData?: TeamPageData;
  listingTitle?: string;
  listingSpanText?: string;
  footerTitle?: string;
  footerSpanText?: string;
  teamMembers?: TeamMember[];
  footerImage?: string;
}

const TeamSection = ({
  teamData,
  listingTitle = '',
  listingSpanText = '',
  footerTitle = '',
  footerSpanText = '',
  teamMembers = [],
  footerImage = '',
}: TeamSectionProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <Image src={ImageConstants.TeamNewBgImage} alt="Team New Background Image" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover" />
        <TeamPageHeroSection
          title={teamData?.Title || ''}
          description={teamData?.description || ''}
          buttonText={teamData?.button_text || ''}
        />
      </div>
      <div className="section-padding-x w-full max-w-maxwidth flex flex-col items-center justify-center">
        <TeamPageListingSection
          smallText={teamData?.teams_tag_text || ''}
          title={listingTitle}
          spanText={listingSpanText}
          teamData={teamMembers}
        />
        <TeamPageFooter
          title={footerTitle}
          spanText={footerSpanText}
          description={teamData?.footer_description || ''}
          buttonOneText={teamData?.footer_button_text || ''}
          buttonOneLink={teamData?.footer_button_link || ''}
          footerImage={footerImage}
        />
      </div>
    </div>
  );
};

export default TeamSection;
