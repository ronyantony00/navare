import HeroSection from '@/components/atoms/AboutUsHeroSection/HeroSection';
import AboutusTestimonial from '@/components/molecules/AboutusTestimonial/AboutusTestimonial';
import VisionMissionSection from '@/components/molecules/VisionMissionSection/VisionMissionSection';
import WhoWeAreSection from '@/components/molecules/WhoWeAreSection/WhoWeAreSection';
import { getAboutusBenefitsDataServer, getAboutusDataServer, getAboutusWhoWeAreDataServer, getWhoWeAreDataServer } from '@/services/apiService';

export const revalidate = 10;

const Page = async () => {
  let apiData, apiDataPage, apiDataBenefits, apiDataWhoWeAre;

  try {
    const [aboutUsResponse, whoWeAreResponse, whoWeAreDataResponse, benefitsResponse] = await Promise.all([
      getAboutusDataServer(),
      getAboutusWhoWeAreDataServer(),
      getWhoWeAreDataServer(),
      getAboutusBenefitsDataServer(),
    ]);

    apiData = aboutUsResponse?.data;
    apiDataPage = whoWeAreResponse?.data;
    apiDataBenefits = benefitsResponse?.data;
    apiDataWhoWeAre = whoWeAreDataResponse?.data;
  } catch (error) {
    console.error('Error fetching about us data:', error);
    apiData = null;
    apiDataPage = null;
    apiDataBenefits = null;
    apiDataWhoWeAre = null;
  }

  return (
    <div className="flex flex-col bg-navare-green">
      <HeroSection
        title={apiData?.title || ''}
        description={apiData?.heroSection?.description || ''}
        buttonText={apiData?.heroSection?.buttonText || ''}
        buttonLink={apiData?.heroSection?.buttonLink || ''}
      />
      <WhoWeAreSection
        titleSection={apiDataPage?.whoWeAre?.title_section || undefined}
        highlightFeatures={apiData?.whoWeAre?.highlights || []}
        benefitPoints={apiDataBenefits?.whoWeAre?.benefits || []}
        mainTextOnImage={apiData?.whoWeAre?.mainTextOnImage}
        smallTextOnImage={apiData?.whoWeAre?.smallTextOnImage}
        mainImage={apiDataWhoWeAre?.whoWeAre?.mainImage?.url || ''}
        subImage={apiDataWhoWeAre?.whoWeAre?.subImage?.url || ''}
      />
      <VisionMissionSection
        tag={apiData?.our_vision?.tag}
        description={apiData?.our_vision?.description}
        title={apiData?.our_vision?.title}
        keyMetrics={apiData?.our_vision?.metric}
        image={apiData?.our_vision?.image?.url || ''}
      />
      <AboutusTestimonial
        title={apiData?.testimonial_title || []}
        authorName={apiData?.companyTestimonial?.authorName}
        authorTitle={apiData?.companyTestimonial?.designation}
        testimonialTitle={apiData?.companyTestimonial?.title}
        testimonial={apiData?.companyTestimonial?.testimonial}
        imageUrl={apiData?.companyTestimonial?.avatar?.url}
        backgroundImage={apiData?.companyTestimonial?.backgroundImage?.url}
      />
    </div>
  );
};

export default Page;
