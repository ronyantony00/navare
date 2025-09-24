import type { IntegrationTag } from '@/types/apiTypes';
import type { IntegrationCard } from '@/types/integration';

/**
 * Filters integration tags to only include those that are used by at least one integration
 * @param integrationTags - Array of all available integration tags
 * @param integrationsData - Array of integration data to check against
 * @returns Filtered array of integration tags that are actually used
 */
export const filterUsedIntegrationTags = (
  integrationTags: IntegrationTag[],
  integrationsData: IntegrationCard[],
): IntegrationTag[] => {
  if (!integrationsData || integrationsData.length === 0) {
    return [];
  }

  // Get all unique tag names that are actually used by integrations
  const usedTagNames = new Set<string>();

  integrationsData.forEach((integration) => {
    if (integration.integration_tags && integration.integration_tags.length > 0) {
      integration.integration_tags.forEach((tag) => {
        usedTagNames.add(tag.tagName);
      });
    }
  });

  // Filter the integration tags to only include those that are used
  return integrationTags.filter(tag => usedTagNames.has(tag.tagName));
};
