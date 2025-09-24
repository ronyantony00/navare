import React from 'react';
import TeamSection from '@/components/organisms/TeamSection/TeamSection';
import { getTeamMembersDataServer, getTeamPageDataServer } from '@/services/apiService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

export const revalidate = 10;

export default async function page() {
  const teamResponse = await getTeamPageDataServer();
  const teamMembersResponse = await getTeamMembersDataServer();

  const teamData = Array.isArray(teamResponse.data) ? teamResponse.data[0] : teamResponse.data;

  const { titlePrefix: listingTitle, titleHighlight: listingSpanText } = extractTitleParts(teamData?.team_text);
  const { titlePrefix: footerTitle, titleHighlight: footerSpanText } = extractTitleParts(teamData?.footer_text);
  return (
    <div className="w-full flex flex-col items-center bg-landing-hero-bg-color">
      <TeamSection
        teamData={teamData}
        listingTitle={listingTitle}
        listingSpanText={listingSpanText}
        footerTitle={footerTitle}
        footerSpanText={footerSpanText}
        teamMembers={teamMembersResponse.data}
        footerImage={teamData?.footerImage?.url}
      />
    </div>
  );
}
