// import { TeamConstants } from '@/constants/dataConstants/teamConstants';
import type { TeamMember } from '@/types/commonTypes';
import React from 'react';
import TeamPageCard from '@/components/atoms/TeamPageCard/TeamPageCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface TeamPageListingSectionProps {
  smallText?: string;
  title?: string;
  spanText?: string;
  teamData?: TeamMember[];
}

const TeamPageListingSection = ({ smallText, title, spanText, teamData }: TeamPageListingSectionProps) => {
  return (
    <div className="relative w-full max-w-maxwidth flex lg:flex-row flex-col items-start justify-start gap-space-30 section-padding-y">
      <div className="size-full flex flex-col gap-space-12">
        <TextCombo
          smallText={smallText}
          title={title}
          spanText={spanText}
          className="border-border-color border-b pb-space-05"
        />
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 flex md:flex-row flex-col gap-space-16">
          {teamData?.map(member => (
            <TeamPageCard
              key={member.id}
              name={member.name}
              designation={member.designation}
              image={getImageUrl(member?.profileImage?.url)}
              description={member.shortBio}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPageListingSection;
