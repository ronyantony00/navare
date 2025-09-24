import type { ClientLogo } from '@/types/interfaces';
import IntegrationsSection from '@/components/organisms/IntegrationsSection/IntegrationsSection';
import { getClientLogosDataServer, getFaqDataServer, getIntegrationPageDataServer, getIntegrationsDataClientPaginated, getIntegrationTagsDataServer } from '@/services/apiService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

export const revalidate = 10;

export default async function page() {
  const [integrationPageResponse, integrationTagsResponse, integrationsResponse, clientLogosResponse, faqResponse] = await Promise.all([
    getIntegrationPageDataServer(),
    getIntegrationTagsDataServer(),
    getIntegrationsDataClientPaginated(),
    getClientLogosDataServer(),
    getFaqDataServer(),
  ]);

  const heroSectionData = Array.isArray(integrationPageResponse.data) ? integrationPageResponse.data[0] : integrationPageResponse.data;
  const integrationsData = integrationsResponse.data;
  const integrationsMeta = integrationsResponse.meta?.pagination;
  const integrationTags = integrationTagsResponse.data;

  const clientLogos = (clientLogosResponse.data || []).map((logo: any) => ({
    id: logo.id,
    clientName: logo.clientName || 'Client',
    logo: logo.logo,
  })) as ClientLogo[];
  const faqRawData = faqResponse.data;

  const { titlePrefix: heroTitlePrefix, titleHighlight: heroTitleHighlight } = extractTitleParts(heroSectionData?.tools_heading);
  const { titlePrefix: faqTitlePrefix, titleHighlight: faqTitleHighlight } = extractTitleParts(heroSectionData?.faq_title);
  const { titlePrefix: solutionTitlePrefix, titleHighlight: solutionTitleHighlight } = extractTitleParts(heroSectionData?.clienLogoSectionTitle);

  return (
    <div>
      <IntegrationsSection
        heroSectionData={heroSectionData}
        integrationsData={integrationsData}
        clientLogos={clientLogos}
        faqRawData={faqRawData}
        heroTitlePrefix={heroTitlePrefix}
        heroTitleHighlight={heroTitleHighlight}
        faqTitlePrefix={faqTitlePrefix}
        faqTitleHighlight={faqTitleHighlight}
        solutionTitlePrefix={solutionTitlePrefix}
        solutionTitleHighlight={solutionTitleHighlight}
        paginationMeta={integrationsMeta}
        integrationTags={integrationTags}
      />
    </div>
  );
}
