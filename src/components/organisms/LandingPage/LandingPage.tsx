import type { ClientLogo, Testimonial } from '@/types/commonTypes';
import type { Article } from '@/types/insights';
import type { LandingPageData, SolutionSystem } from '@/types/landingPage';
import React, { useMemo } from 'react';
import LandingPageEcoSystem from '@/components/molecules/LandingPageEcosystem/LandingPageEcoSystem';
import LandingPageFooter from '@/components/molecules/LandingPageFooter/LandingPageFooter';
import LandingPageHeroSection from '@/components/molecules/LandingPageHeroSection/LandingPageHeroSection';
import LandingPageOurImpact from '@/components/molecules/LandingPageOurImpact/LandingPageOurImpact';
import LandingPageSeaCargo from '@/components/molecules/LandingPageSeaCargo/LandingPageSeaCargo';
import LandingPageServiceSection from '@/components/molecules/LandingPageServiceSection/LandingPageServiceSection';
import LandingPageStories from '@/components/molecules/LandingPageStories/LandingPageStories';
import LandingPageTestimonial from '@/components/molecules/LandingPageTestimonial/LandingPageTestimonial';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

function getImageUrl(imageObj?: { url?: string }) {
  if (!imageObj?.url) {
    return '';
  }
  return imageObj.url;
}

const LandingPage = ({ landingPageDataServer, clientDataServer, testimonialDataServer, footerDataServer, articlesDataServer, generalDataServer, keyValuePairDataServer }: { landingPageDataServer: LandingPageData; clientDataServer: { data: ClientLogo[] }; testimonialDataServer: { data: Testimonial[] }; footerDataServer: LandingPageData; articlesDataServer: { data: Article[] }; generalDataServer: LandingPageData; keyValuePairDataServer: LandingPageData }) => {
  const landingPageData = landingPageDataServer?.data;
  const testimonialData = testimonialDataServer?.data ?? [];
  const footerData = footerDataServer?.data;
  const articlesData = articlesDataServer?.data ?? [];
  const generalData = generalDataServer?.data;

  const heroSection = landingPageData?.heroSection;
  const solutionSection = landingPageData?.servicesSection;
  const solutionSectionCard = landingPageData?.servicesSection?.solution_card;
  const whyUsSection = landingPageData?.whyUsSection;
  const ecosystemSection = landingPageData?.integrationSection;
  const newsAndInsightsSection = landingPageData?.insightsSection;
  const testimonialSection = landingPageData?.testimonialSection;
  const ourImpactSection = landingPageData?.impactSection;
  const clientLogo = clientDataServer?.data;

  const heroTitle = useMemo(() => heroSection?.title, [heroSection]);
  const heroDescription = useMemo(() => heroSection?.description, [heroSection]);
  const heroButtonText = useMemo(() => heroSection?.button?.button_label, [heroSection]);
  const heroLinkPrefixText = useMemo(() => heroSection?.key_value_list?.key, [heroSection]);
  const heroLinkUrl = useMemo(() => heroSection?.button?.button_link, [heroSection]);
  const serviceSectionTag = useMemo(() => solutionSection?.tag, [solutionSection]);
  const serviceSectionTitle = useMemo(() => solutionSection?.title, [solutionSection]);
  const generalMedia = useMemo(() => generalData?.generalImage, [generalData]);
  const keyValueList = useMemo(() => keyValuePairDataServer?.data?.heroSection?.key_value_list?.values, [keyValuePairDataServer]);

  const whyUsSectionTitle = useMemo(() => whyUsSection?.title, [whyUsSection]);
  const helpText = useMemo(() => whyUsSection?.contactInfo?.help_text, [whyUsSection]);
  const contactNumber = useMemo(() => whyUsSection?.contactInfo?.phone, [whyUsSection]);
  const features: SolutionSystem[] = useMemo(() => whyUsSection?.our_solution_systems || [], [whyUsSection]);
  const contactLink = useMemo(() => whyUsSection?.button?.button_link, [whyUsSection]);
  const contactLinkText = useMemo(() => whyUsSection?.button?.button_label, [whyUsSection]);
  const metricValue = useMemo(() => whyUsSection?.metric?.metric_value, [whyUsSection]);
  const metricContext = useMemo(() => whyUsSection?.metric?.metric_description, [whyUsSection]);

  const ecosystemSectionTitle = useMemo(() => ecosystemSection?.title, [ecosystemSection]);
  const ecosystemSectionDescription = useMemo(() => ecosystemSection?.description, [ecosystemSection]);

  const newsAndInsightsSectionTitle = useMemo(() => newsAndInsightsSection?.title, [newsAndInsightsSection]);

  const testimonialSectionTitle = useMemo(() => testimonialSection?.title, [testimonialSection]);
  const testimonialTag = useMemo(() => testimonialSection?.tag, [testimonialSection]);
  const testimonialDescription = useMemo(() => testimonialSection?.description, [testimonialSection]);

  const ourImpactSectionTitle = useMemo(() => ourImpactSection?.title, [ourImpactSection]);
  const ourImpactTag = useMemo(() => ourImpactSection?.tag, [ourImpactSection]);
  const metricComponentRepeatable = useMemo(() => ourImpactSection?.metrics, [ourImpactSection]);

  const footerButtonText = useMemo(() => footerData?.impactSection?.footerSection?.cta_button?.button_label || '', [footerData]);
  const footerDescription = useMemo(() => footerData?.impactSection?.footerSection?.description || '', [footerData]);
  const footerSectionTitle = useMemo(() => footerData?.impactSection?.footerSection?.title, [footerData]);

  const images = useMemo(() => whyUsSection?.images || [], [whyUsSection]);
  const imageOneUrl = useMemo(() => getImageUrl(images[0]), [images]);
  const imageTwoUrl = useMemo(() => getImageUrl(images[1]), [images]);
  const imageThreeUrl = useMemo(() => getImageUrl(images[2]), [images]);
  const generalMediaImageUrl = useMemo(() => getImageUrl(generalMedia), [generalMedia]);
  const generalMediaIsVideo = useMemo(() => generalMedia?.mime?.startsWith('video/'), [generalMedia]);
  const testimonialVideoUrl = landingPageData?.testimonialSection?.testimonialVideo?.url;

  const { titlePrefix: ecosystemTitlePrefix, titleHighlight: ecosystemTitleHighlight } = useMemo(() => extractTitleParts(ecosystemSectionTitle), [ecosystemSectionTitle]);
  const { titlePrefix: newsAndInsightsTitlePrefix, titleHighlight: newsAndInsightsTitleHighlight } = useMemo(() => extractTitleParts(newsAndInsightsSectionTitle), [newsAndInsightsSectionTitle]);
  const { titlePrefix: testimonialTitlePrefix, titleHighlight: testimonialTitleHighlight } = useMemo(() => extractTitleParts(testimonialSectionTitle), [testimonialSectionTitle]);
  const { titlePrefix: ourImpactTitlePrefix, titleHighlight: ourImpactTitleHighlight } = useMemo(() => extractTitleParts(ourImpactSectionTitle), [ourImpactSectionTitle]);
  const { titlePrefix: footerTitlePrefix, titleHighlight: footerTitleHighlight } = useMemo(() => extractTitleParts(footerSectionTitle), [footerSectionTitle]);
  const { titlePrefix: whyUsTitlePrefix, titleHighlight: whyUsTitleHighlight } = useMemo(() => extractTitleParts(whyUsSectionTitle), [whyUsSectionTitle]);
  const { titlePrefix: serviceSectionTitlePrefix, titleHighlight: serviceSectionTitleHighlight } = useMemo(() => extractTitleParts(serviceSectionTitle), [serviceSectionTitle]);

  return (
    <div className=" w-full flex flex-col items-center justify-center">
      <div className="relative landing-hero-bg w-full flex flex-col items-center justify-center">
        <LandingPageHeroSection
          titlePrefix={heroTitle || ''}
          description={heroDescription || ''}
          buttonOneText={heroButtonText || ''}
          linkUrl={heroLinkUrl || ''}
          subKey={heroLinkPrefixText || ''}
          subValue={keyValueList || ''}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-landing-hero-bg-color">
        <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
          <LandingPageServiceSection
            smallText={serviceSectionTag || ''}
            titlePrefix={serviceSectionTitlePrefix || ''}
            titleHighlight={serviceSectionTitleHighlight}
            solutionSectionCard={solutionSectionCard}
          />
        </div>
        <div className="w-full max-w-maxwidth flex flex-col items-center justify-center">
          <LandingPageSeaCargo
            titlePrefix={whyUsTitlePrefix}
            titleHighlight={whyUsTitleHighlight}
            helpText={helpText}
            contactNumber={contactNumber}
            imageOneUrl={imageOneUrl}
            imageTwoUrl={imageTwoUrl}
            imageThreeUrl={imageThreeUrl}
            seaCargoFeatures={features}
            contactLink={contactLink}
            contactLinkText={contactLinkText}
            metricValue={metricValue}
            metricContext={metricContext}
            generalImageUrl={generalMediaImageUrl}
            generalMediaIsVideo={generalMediaIsVideo}
          />
        </div>
        <div className="bg-[image:var(--bg-technology-section-bg)] bg-no-repeat bg-center bg-cover w-full">
          <LandingPageEcoSystem
            titlePrefix={ecosystemTitlePrefix}
            titleHighlight={ecosystemTitleHighlight}
            description={ecosystemSectionDescription}
            clientLogo={clientLogo}
          />
        </div>
        <div className="relative flex flex-col items-center bg-no-repeat bg-top w-full">
          <LandingPageStories
            smallText={newsAndInsightsSection?.tag}
            titlePrefix={newsAndInsightsTitlePrefix}
            titleHighlight={newsAndInsightsTitleHighlight}
            stories={articlesData}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          <LandingPageTestimonial
            smallText={testimonialTag}
            titlePrefix={testimonialTitlePrefix}
            titleHighlight={testimonialTitleHighlight}
            description={testimonialDescription}
            testimonialData={testimonialData}
            videoUrl={testimonialVideoUrl}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          <LandingPageOurImpact
            smallText={ourImpactTag}
            titlePrefix={ourImpactTitlePrefix}
            titleHighlight={ourImpactTitleHighlight}
            impactData={metricComponentRepeatable}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          <LandingPageFooter
            titlePrefix={footerTitlePrefix}
            titleHighlight={footerTitleHighlight}
            description={footerDescription}
            buttonOneText={footerButtonText}
            image={
              footerData?.impactSection?.footerSection?.bg_image?.formats?.large?.url
              || footerData?.impactSection?.footerSection?.bg_image?.url
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
