import type { FeaturedIntegration, Integration, SortOption } from '@/types/integration';
import { useMemo } from 'react';
import { sortItems } from '@/utils/Sorting';

interface UseFilteredIntegrationsProps {
  integrations: Integration[];
  activeFilter: string;
  currentSort: SortOption;
}

interface UseFilteredIntegrationsReturn {
  featuredIntegrations: FeaturedIntegration[];
  regularIntegrations: Integration[];
}

// Helper function to convert Integration to FeaturedIntegration format
const convertToFeaturedIntegration = (integration: Integration): FeaturedIntegration => {
  return {
    ...integration,
    logo: {
      url: integration.logo, // integration.logo is a string, so we wrap it in an object
    },
  };
};

export const useFilteredIntegrations = ({
  integrations,
  activeFilter,
  currentSort,
}: UseFilteredIntegrationsProps): UseFilteredIntegrationsReturn => {
  return useMemo(() => {
    const filtered = activeFilter === 'all'
      ? integrations
      : integrations.filter(integration => integration.category === activeFilter);

    const sorted = sortItems(filtered, currentSort);

    const featured: FeaturedIntegration[] = [];
    const regular: Integration[] = [];

    sorted.forEach((integration) => {
      if (integration.badges?.some(badge => badge.text === 'Featured')) {
        featured.push(convertToFeaturedIntegration(integration));
      } else {
        regular.push(integration);
      }
    });

    return {
      featuredIntegrations: featured,
      regularIntegrations: regular,
    };
  }, [integrations, activeFilter, currentSort]);
};
