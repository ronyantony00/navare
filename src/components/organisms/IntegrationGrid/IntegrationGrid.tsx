'use client';

import type { IntegrationCard as Integration } from '@/types/integration';
import clsx from 'clsx';
import IntegrationCard from '@/components/organisms/IntegrationCard/IntegrationCard';

interface IntegrationGridProps {
  integrations: Integration[];
  className?: string;
}

const IntegrationGrid = ({ integrations, className }: IntegrationGridProps) => {
  return (
    <div className="flex flex-col">
      <div className={clsx('grid grid-cols-1 2md:grid-cols-2 gap-x-space-27 gap-y-space-15', className)}>
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={`${integration.Integration_name}-${index}`}
            logo={integration?.Integration_logo?.url}
            title={integration.Integration_name}
            description={integration.description}
            badges={integration.integration_tags?.map(tag => ({
              text: tag.tagName,
            }))}
          />
        ))}
      </div>
    </div>
  );
};

export default IntegrationGrid;
