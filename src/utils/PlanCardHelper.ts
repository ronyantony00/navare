import ImageConstants from '@/constants/imageConstants/imageConstants';

export const getBadgeText = (badge: string): string => {
  const badgeMap: Record<string, string> = {
    'add-ons': 'ADD-ONS',
    'most-popular': 'MOST POPULAR',
    'essential': 'ESSENTIAL',
  };
  return badgeMap[badge] || badge.toUpperCase();
};

export const getFeatureIcon = (planBadge: string) => {
  if (planBadge === 'add-ons') {
    return {
      src: ImageConstants.PlusIcon,
      alt: 'Add-on feature',
    };
  }
  return {
    src: ImageConstants.CheckGreen,
    alt: 'Included feature',
  };
};
