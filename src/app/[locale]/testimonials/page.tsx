import TestimonialHeroSection from '@/components/molecules/TestimonialHeroSection/TestimonialHeroSection';
import TestimonialSection from '@/components/molecules/TestimonialSection/TestimonialSection';
import { getPaginatedTestimonialDataServer, getTestimonialPageDataServer, getVideoTestimonialsDataServer } from '@/services/apiService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

export const revalidate = 10;

export default async function Page() {
  const [pageDetailsResponse, paginatedTestimonialDataResponse, testimonialsDataResponse] = await Promise.all([
    getTestimonialPageDataServer(),
    getPaginatedTestimonialDataServer(1, 9),
    getVideoTestimonialsDataServer(),
  ]);

  const pageDetails = Array.isArray(pageDetailsResponse.data) ? pageDetailsResponse.data[0] : pageDetailsResponse.data;
  const paginatedTestimonialData = paginatedTestimonialDataResponse.data;
  const testimonialsData = testimonialsDataResponse.data;
  const testimonialFooterTitle = pageDetails?.footerCardTitle;
  const { titlePrefix: footerTitle, titleHighlight: footerSpanText, titleSuffix: footerExtraTitle } = extractTitleParts(testimonialFooterTitle);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <TestimonialHeroSection
          titlePrefix={pageDetails?.heroSectionTitle || ''}
          loading={false}
          description={pageDetails?.heroSectionDescription}
        />
        <div className="w-full flex flex-col items-center justify-center overflow-x-hidden">
          <TestimonialSection
            videoTestimonialsData={testimonialsData ?? undefined}
            testimonialData={paginatedTestimonialData ?? undefined}
            paginationMeta={paginatedTestimonialDataResponse.meta?.pagination}
            footerTitle={footerTitle}
            footerSpanText={footerSpanText}
            footerDescription={pageDetails?.footerCardDescription}
            footerMedia={pageDetails?.footerMedia}
            footerExtraTitle={footerExtraTitle}
            buttonOneText={pageDetails?.footerButtonText || ''}
            variant="testimonial"
            borderColor="border-none"
          />
        </div>
      </div>
    </div>
  );
}
