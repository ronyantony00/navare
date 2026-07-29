import NotFoundPage from '@/components/atoms/NotFoundPage/NotFoundPage';
import FooterSection from '@/components/atoms/UsecasePageFooterSection/FooterSection';
import ChallengesSection from '@/components/molecules/ChallengesSection/ChallengesSection';
import PageIntroBlock from '@/components/molecules/PageIntroBlock/PageIntroBlock';
import SolutionSection from '@/components/molecules/UsecaseSolutionSection/UsecaseSolutionSection';
import FeaturesSection from '@/components/organisms/FeaturesSection/FeaturesSection';
import UsecaseCardSection from '@/components/organisms/UsecaseCardSection/UsecaseCardSection';
import UsecaseTestimonials from '@/components/organisms/UsecaseTestimonials/UsecaseTestimonials';
import { getUsecaseBySlugServer, getUsecaseTestimonialDataServer } from '@/services/apiService';

export const revalidate = 10;

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [testimonialResponse, usecaseResponse] = await Promise.all([
    getUsecaseTestimonialDataServer(slug),
    getUsecaseBySlugServer(slug),
  ]);

  const useCaseData = Array.isArray(usecaseResponse.data) ? usecaseResponse.data[0] : usecaseResponse.data;

  if (!useCaseData) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col bg-navare-green">
      <PageIntroBlock
        tagText={useCaseData?.navbarCard?.short_title || ''}
        titlePrefix={useCaseData?.heroSection?.title}
        description={useCaseData?.heroSection?.description || ''}
        buttonOneText={useCaseData?.heroSection?.buttonText || ''}
        buttonOneLink={useCaseData?.heroSection?.bookDemoLink || ''}
      />
      <UsecaseCardSection
        title={useCaseData?.FeatureSectionTitle?.title || []}
        sectionDescription={useCaseData?.FeatureSectionTitle?.description || ''}
        CardData={useCaseData?.featureSection || []}
      />
      <ChallengesSection
        title={useCaseData?.challengesSection?.title || []}
        description={useCaseData?.challengesSection?.description || ''}
        image={useCaseData?.challengesSection?.coverImage?.url || ''}
      />
      <SolutionSection
        title={useCaseData?.solutionSection?.title || []}
        description={useCaseData?.solutionSection?.mainDescription || ''}
        subDescription={useCaseData?.solutionSection?.subDescription || ''}
        mainImage={useCaseData?.solutionSection?.mainImage.url || ''}
        subImage={useCaseData?.solutionSection?.subImage.url || ''}
      />
      <FeaturesSection
        title={useCaseData?.otherUsecasesTitleSection?.title || []}
        tag={useCaseData?.otherUsecasesTitleSection?.tag || ''}
        featureCards={useCaseData?.otherUsecases || []}
        image={useCaseData?.otherUsecasesTitleSection?.image?.url || ''}
      />
      <UsecaseTestimonials
        title={useCaseData?.testimonialSection?.title || []}
        tag={useCaseData?.testimonialSection?.tag || ''}
        buttonText={useCaseData?.testimonialSection?.buttonText || ''}
        testimonialData={testimonialResponse.data || []}
      />
      {/* 120px gap between All Testimonials and Book a Demo */}
      {/* <div className="h-[100px] w-full shrink-0" aria-hidden /> */}
      <FooterSection
        title={useCaseData?.footerSection?.title || []}
        description={useCaseData?.footerSection?.description || ''}
        buttonText={useCaseData?.footerSection?.buttonText || ''}
        buttonLink={useCaseData?.footerSection?.buttonLink || ''}
        image={useCaseData?.footerSection?.backgroundImage?.url || ''}
      />
    </div>
  );
};
