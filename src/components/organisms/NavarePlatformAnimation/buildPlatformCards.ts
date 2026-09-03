import type { SolutionCard } from '@/components/molecules/LandingPageServiceSection/LandingPageServiceSection';
import type { PlatformCardData } from '@/components/organisms/NavarePlatformAnimation/platformCardsData';
import { platformCards } from '@/components/organisms/NavarePlatformAnimation/platformCardsData';
import { getImageUrl } from '@/utils/urlConstructor';

const solutionLinkMap: Record<string, string> = {
  NAVONETMS: 'solutions/navonetms',
  NAVONECMS: 'solutions/navonecms',
  NAVBRIDGE: 'solutions/navbridge',
  NAVSCAN: 'solutions/navscan',
  CUSTOMISED: 'solutions/customised',
};

function getSolutionHref(link: string | null, fallbackHref: string) {
  if (!link) {
    return fallbackHref;
  }

  const path = solutionLinkMap[link] || `solutions/${link.toLowerCase()}`;
  return `/${path}`;
}

export function buildPlatformCards(solutionSectionCard?: SolutionCard[]): PlatformCardData[] {
  const cardsByLink = new Map(
    solutionSectionCard?.filter(card => card.link).map(card => [card.link!, card]) ?? [],
  );

  return platformCards.map((slot) => {
    const backendCard = cardsByLink.get(slot.linkKey);

    if (!backendCard) {
      return slot;
    }

    const logoUrl = backendCard.logo?.url ? getImageUrl(backendCard.logo.url) : '';

    return {
      ...slot,
      ariaLabel: backendCard.solution_name || slot.ariaLabel,
      title: backendCard.solution_name || slot.title,
      description: backendCard.description || slot.description,
      logo: logoUrl || slot.logo,
      logoAlt: backendCard.solution_name || slot.logoAlt,
      href: getSolutionHref(backendCard.link, slot.href),
    };
  });
}
