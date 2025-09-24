'use client';

import type { IntegrationTag, PaginationMeta } from '@/types/apiTypes';
import type { IntegrationCard, IntegrationHeroData } from '@/types/integration';
import type { ClientLogo, faqType } from '@/types/interfaces';
import { useMemo } from 'react';
import IntegrationsHero from '@/components/molecules/IntegrationsHero/IntegrationsHero';
import IntegrationCardSection from '@/components/organisms/IntegrationCardSection/IntegrationCardSection';
import IntegrationFAQ from '@/components/organisms/IntegrationFAQ/IntegrationFAQ';
import { filterUsedIntegrationTags } from '@/utils/utilFunctions/integrationUtils';
import IntegrationLogoMarquee from '../IntegrationPageMarquee/IntegrationPageMarquee';

interface IntegrationsSectionProps {
  heroSectionData?: IntegrationHeroData;
  integrationsData?: IntegrationCard[];
  clientLogos?: ClientLogo[];
  faqRawData?: faqType[];
  heroTitlePrefix?: string;
  heroTitleHighlight?: string;
  faqTitlePrefix?: string;
  faqTitleHighlight?: string;
  solutionTitlePrefix?: string;
  solutionTitleHighlight?: string;
  paginationMeta?: PaginationMeta;
  integrationTags?: IntegrationTag[];
}

const IntegrationsSection = ({
  heroSectionData,
  integrationsData = [],
  clientLogos = [],
  faqRawData = [],
  heroTitlePrefix,
  heroTitleHighlight,
  faqTitlePrefix,
  faqTitleHighlight,
  solutionTitlePrefix,
  solutionTitleHighlight,
  paginationMeta,
  integrationTags = [],
}: IntegrationsSectionProps) => {
  // Filter integration tags to only include those that are used by at least one integration
  const filteredIntegrationTags = useMemo(() => {
    return filterUsedIntegrationTags(integrationTags, integrationsData);
  }, [integrationsData, integrationTags]);

  return (
    <div className="flex flex-col bg-navare-green">
      <IntegrationsHero
        title={heroSectionData?.pageTitle}
        description={heroSectionData?.description}
        clientLogos={clientLogos}
      />
      <IntegrationCardSection
        smallText={heroSectionData?.toolSectionTag}
        textPrefix={heroTitlePrefix || ''}
        textSuffix={heroTitleHighlight || ''}
        cardData={integrationsData}
        error={null}
        paginationMeta={paginationMeta}
        filters={filteredIntegrationTags.map(tag => tag.tagName)}
      />
      <IntegrationFAQ data={faqRawData} titlePrefix={faqTitlePrefix || ''} titleHighlight={faqTitleHighlight || ''} />
      <IntegrationLogoMarquee
        clientLogos={clientLogos}
        titlePrefix={solutionTitlePrefix || ''}
        titleHighlight={solutionTitleHighlight || ''}
        description={heroSectionData?.clientLogoSectionDescription}
      />
    </div>
  );
};

export default IntegrationsSection;
