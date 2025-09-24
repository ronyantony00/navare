import type { IntegrationCard, SortOption } from '@/types/integration';

interface CategorizeIntegrationsParams {
  integrations: IntegrationCard[];
  activeFilter: string;
  currentSort: SortOption;
}

// Custom sorting function for IntegrationCard items
const sortIntegrationCards = (
  items: IntegrationCard[],
  sortOption: SortOption,
): IntegrationCard[] => {
  if (!Array.isArray(items) || items.length === 0) {
    return items || [];
  }

  return [...items].sort((a, b) => {
    const nameA = a.Integration_name || '';
    const nameB = b.Integration_name || '';

    switch (sortOption) {
      case 'name-asc':
        return nameA.localeCompare(nameB);
      case 'name-desc':
        return nameB.localeCompare(nameA);
      default:
        return 0;
    }
  });
};

// Helper function to check if integration matches the filter
const matchesFilter = (integration: IntegrationCard, filter: string): boolean => {
  if (filter === 'all') {
    return true;
  }

  return integration.integration_tags?.some((tag) => {
    const tagNameLower = tag.tagName.toLowerCase();
    const filterLower = filter.toLowerCase();

    // Handle different variations of tag names
    switch (filterLower) {
      case 'carriers':
        return tagNameLower === 'carrier';
      case 'tech platforms':
        return tagNameLower === 'tech platform'
          || tagNameLower === 'tech platforms'
          || tagNameLower === 'techplatform'
          || tagNameLower === 'techplatforms'
          || tagNameLower === 'technology platform'
          || tagNameLower === 'technology platforms';
      case 'marketplaces':
        return tagNameLower === 'marketplaces';
      default:
        return tagNameLower === filterLower;
    }
  }) || false;
};

export const categorizeIntegrations = ({
  integrations,
  activeFilter,
  currentSort,
}: CategorizeIntegrationsParams) => {
  // Debug: Log all unique tag names to understand the data structure
  if (activeFilter === 'tech platforms') {
    const allTags = integrations.flatMap(integration =>
      integration.integration_tags?.map(tag => tag.tagName) || [],
    );
    const uniqueTags = [...new Set(allTags)];
    console.warn('All unique tag names in data:', uniqueTags);
    console.warn('Filtering for:', activeFilter);
  }

  // First, apply filtering
  const filtered = integrations.filter(integration =>
    matchesFilter(integration, activeFilter),
  );

  // Then, apply sorting
  const sorted = sortIntegrationCards(filtered, currentSort);

  // Finally, categorize into featured and regular
  const featuredIntegrations: IntegrationCard[] = [];
  const regularIntegrations: IntegrationCard[] = [];

  sorted.forEach((integration) => {
    const hasFeaturedTag = integration.integration_tags?.some(
      tag => tag.tagName.toLowerCase() === 'featured',
    );

    if (hasFeaturedTag) {
      featuredIntegrations.push(integration);
    } else {
      regularIntegrations.push(integration);
    }
  });

  return { featuredIntegrations, regularIntegrations };
};
