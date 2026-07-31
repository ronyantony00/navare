'use client';
import type { Testimonial } from '@/types/commonTypes';
import type { title } from '@/types/usecase';
import TestimonialSwiperCard from '@/components/atoms/TestimonialSwiperCard/TestimonialSwiperCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface UsecaseTestimonialsProps {
  title: title[];
  buttonText?: string;
  tag: string;
  testimonialData?: Testimonial[] | null;
}

const UsecaseTestimonials = ({ testimonialData, title, buttonText, tag }: UsecaseTestimonialsProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  const testimonials = Array.isArray(testimonialData) ? testimonialData : [];
  const midpoint = Math.ceil(testimonials.length / 2);
  const firstColumnData = testimonials.slice(0, midpoint);
  const secondColumnData = testimonials.slice(midpoint);

  return (
    <div className="w-full relative">
      <span className="absolute right-space-50 top-space-50 w-space-300 h-space-200  blur-[100px] rounded-full opacity-60 pointer-events-none" />
      <div className="max-w-maxwidth mx-auto section-padding-x pt-space-20 md:pt-space-30 pb-space-20 md:pb-space-30">
        <div className="flex flex-col w-full gap-space-20 md:gap-space-30">
          <TextCombo
            title={titlePrefix || ''}
            spanText={titleHighlight || ''}
            extraTitle={titleSuffix || ''}
            titleClass="section-title"
            buttonOneText={buttonText || ''}
            buttonOneLink="/testimonials"
            smallText={tag || ''}
            className="flex justify-center items-center max-w-pct-090 sms:max-w-pct-065 2md:max-w-pct-050 mx-auto text-center"
            btnClass="justify-center"
          />
          {testimonials.length > 0
            ? (
              <div className="flex flex-col md:flex-row items-start gap-x-space-25 md:gap-y-space-00 gap-y-space-16 w-full">
                <div className="flex flex-col gap-y-space-16 flex-1">
                  {firstColumnData.map(testimonial => (
                    <TestimonialSwiperCard
                      key={testimonial.id}
                      rating={testimonial.rating}
                      title={testimonial.title}
                      shortTestimonial={testimonial?.shortTestimonial}
                      clientName={testimonial.authorName}
                      designation={testimonial.authorTitle}
                      companyLogo={testimonial.companyLogo?.url}
                      authorAvatar={testimonial.authorAvatar?.url}
                      featured={testimonial.featured}
                      className="impact-card-bg"
                      headerOnTop={true}
                      linkUrl={testimonial.extrernalLink}
                      linkonButton={true}
                      titleVariant="large"
                      showRating={true}
                      variant="usecase"
                      slug={testimonial.slug}
                      contentClass="line-clamp-4"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-y-space-16 flex-1">
                  {secondColumnData.map(testimonial => (
                    <TestimonialSwiperCard
                      key={testimonial.id}
                      rating={testimonial.rating}
                      title={testimonial.title}
                      shortTestimonial={testimonial?.shortTestimonial}
                      clientName={testimonial.authorName}
                      designation={testimonial.authorTitle}
                      companyLogo={testimonial.companyLogo?.url}
                      authorAvatar={testimonial.authorAvatar?.url}
                      featured={testimonial.featured}
                      className="impact-card-bg"
                      headerOnTop={true}
                      linkUrl={testimonial.extrernalLink}
                      linkonButton={true}
                      titleVariant="large"
                      showRating={true}
                      variant="usecase"
                      slug={testimonial.slug}
                      contentClass="line-clamp-3"
                    />
                  ))}
                </div>
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
};

export default UsecaseTestimonials;
