import LandingPageTestimonial from '@/components/molecules/LandingPageTestimonial/LandingPageTestimonial';
import ContactInfoSection from '@/components/organisms/ContactInfoSection/ContactInfoSection';
import FaqSection from '@/components/organisms/ContactPageFaqSection/ContactPageFaqSection';
import ContactSection from '@/components/organisms/ContactSection/ContactSection';
import { getAllTestimonialDataServer, getContactUsPageDataServer, getFaqLimitedDataServer } from '@/services/apiService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

export const revalidate = 10;

export default async function Page() {
  const [contactUsPageResponse, faqResponse, testimonialResponse] = await Promise.all([
    getContactUsPageDataServer(),
    getFaqLimitedDataServer(),
    getAllTestimonialDataServer(),
  ]);

  const contactUsPageData = Array.isArray(contactUsPageResponse.data) ? contactUsPageResponse.data[0] : contactUsPageResponse.data;
  const faqRawData = faqResponse.data;
  const testimonialRawData = testimonialResponse.data;

  const { titlePrefix: testimonialTitlePrefix, titleHighlight: testimonialTitleHighlight } = extractTitleParts(contactUsPageData?.testimonialTitleSection?.sectionTitle);
  const { titlePrefix: faqTitlePrefix, titleHighlight: faqTitleHighlight } = extractTitleParts(contactUsPageData?.faqSectionTitle);

  return (
    <main className="flex flex-col bg-navare-green w-full">
      <div className="w-full">
        <ContactSection
          bannerText={contactUsPageData?.titleSection?.tag}
          title={contactUsPageData?.titleSection?.title}
          description={contactUsPageData?.titleSection?.description}
          buttonText={contactUsPageData?.formButtonText}
        />
        <ContactInfoSection
          ContactInfo={contactUsPageData?.contact_info_section}
        />
        <LandingPageTestimonial
          titlePrefix={testimonialTitlePrefix}
          titleHighlight={testimonialTitleHighlight}
          description={contactUsPageData?.testimonialTitleSection?.sectionDescription}
          className="w-full items-center text-center z-20"
          textClass="text-center"
          descClass="max-w-pct-090 sm:max-w-pct-070 2md:max-w-pct-050 mx-auto text-center"
          testimonialData={testimonialRawData || []}
          mainClass="gap-space-08 lg:gap-space-24"
        />
        <FaqSection data={faqRawData || []} titlePrefix={faqTitlePrefix} titleHighlight={faqTitleHighlight} />
      </div>
    </main>
  );
}
