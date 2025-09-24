'use client';

import type { CaseStudy, FreightSectionProps, HeadingDataItem, SolutionUseCaseAPIResponse, Testimonial } from '@/types/commonTypes';
import AllInOnePlatform from '@/components/molecules/AllInOnePlatform/AllInOnePlatform';
import FreightSection from '@/components/molecules/FreightSection/FreightSection';
import SeamlessIntegration from '@/components/molecules/SeamlessIntegration/SeamlessIntegration';
import SolutionPageScanningSolutions from '@/components/molecules/SolutionPageScanningSolutions/SolutionPageScanningSolutions';
import SolutionsHeroSection from '@/components/molecules/SolutionsHeroSection/SolutionsHeroSection';
import SolutionsOurUseCase from '@/components/molecules/SolutionsOurCase/SolutionsOurCase';
import SolutionsPlatformSection from '@/components/molecules/SolutionsPlatformSection/SolutionsPlatformSection';
import TestimonialSection from '@/components/molecules/TestimonialSection/TestimonialSection';

import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface SolutionSectionProps {
  heroData?: HeadingDataItem[];
  solutionAdvantageData?: HeadingDataItem[];
  ourUseCaseData?: SolutionUseCaseAPIResponse[];
  featureTabData?: HeadingDataItem[];
  testimonialData?: Testimonial[];
  caseStudyData?: CaseStudy[];
  apiSectionData?: FreightSectionProps['solutionData'];
  knowMoreSectionData?: any;
}

export interface ApiSectionCard {
  title: { text: string }[];
  shortIntro?: string;
  media?: { url: string };
  images?: { url: string }[];
}

const SolutionSection = ({
  heroData,
  solutionAdvantageData,
  ourUseCaseData,
  featureTabData,
  testimonialData,
  caseStudyData,
  knowMoreSectionData,
}: SolutionSectionProps) => {
  const knowMoreData = knowMoreSectionData?.[0]?.knowMoreSection;

  const testimonialTitle = heroData?.[0]?.testimonialCardSection ?? '';
  const heroTitle = heroData?.[0]?.heroSection.title ?? '';
  const heroSubTitle = heroData?.[0]?.heroSection.description ?? '';
  const platformTitle = heroData?.[0]?.keyFeaturesSection.title ?? '';
  const platformDescription = heroData?.[0]?.keyFeaturesSection.description ?? '';
  const ourCaseTitle = heroData?.[0]?.usecasesSection.title ?? '';
  const ourCaseSmallTitle = heroData?.[0]?.usecasesSection.tag ?? '';
  const onboardingDescription = heroData?.[0]?.aboutSection.description ?? '';
  const onboardingTitle = heroData?.[0]?.aboutSection.title ?? '';

  const { titlePrefix: testimonialTitlePrefix, titleHighlight: testimonialTitleHighlight } = extractTitleParts(testimonialTitle);
  const { titlePrefix: platformTitlePrefix, titleHighlight: platformTitleHighlight } = extractTitleParts(platformTitle);
  const { titlePrefix: ourCaseTitlePrefix, titleHighlight: ourCaseTitleHighlight } = extractTitleParts(ourCaseTitle);
  const { titlePrefix: onboardingTitlePrefix, titleHighlight: onboardingTitleHighlight } = extractTitleParts(onboardingTitle);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        <SolutionsHeroSection
          titlePrefix={heroTitle}
          description={heroSubTitle}
          bannerImage={heroData?.[0]?.heroSection.solutionImage?.url ?? ''}
          buttonText={heroData?.[0]?.heroSection.buttonText ?? ''}
          buttonLink={heroData?.[0]?.heroSection.buttonLink ?? ''}
        />
        <div className="bg-landing-hero-bg-color w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center overflow-hidden">
            <SolutionPageScanningSolutions
              description={onboardingDescription ?? ''}
              titlePrefix={onboardingTitlePrefix}
              titleHighlight={onboardingTitleHighlight}
              image={heroData?.[0]?.aboutSection.image?.url ?? ''}
            />
            <SolutionsPlatformSection
              tagText={heroData?.[0]?.keyFeaturesSection?.tag ?? ''}
              featureTabData={featureTabData}
              solutionAdvantageData={solutionAdvantageData}
              titlePrefix={platformTitlePrefix}
              titleHighlight={platformTitleHighlight}
              description={platformDescription}
            />
            <SolutionsOurUseCase
              ourCaseData={ourUseCaseData}
              smallTitle={ourCaseSmallTitle}
              titlePrefix={ourCaseTitlePrefix}
              titleHighlight={ourCaseTitleHighlight}
            />
            <AllInOnePlatform
              headingData={heroData}
            />
            {testimonialData && testimonialData.length > 0 && (
              <TestimonialSection
                testimonialData={testimonialData}
                titlePrefix={testimonialTitlePrefix}
                titleHighlight={testimonialTitleHighlight}
                caseStudyData={caseStudyData}
                textClass="items-start"
                variant="solution"
              />
            )}
            <SeamlessIntegration
              tag={knowMoreData?.titleSection?.tag ?? ''}
              title={knowMoreData?.titleSection?.title ?? []}
              description={knowMoreData?.titleSection?.description ?? ''}
              buttonOneText={knowMoreData?.buttonText ?? ''}
              buttonOneLink={knowMoreData?.buttonLink ?? ''}
              image={knowMoreData?.media?.url}
            />
            <FreightSection
              solutionData={heroData?.[0]?.technologySection ?? {}}
              animationText={heroData?.[0]?.navbarCard?.short_title ?? ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;
