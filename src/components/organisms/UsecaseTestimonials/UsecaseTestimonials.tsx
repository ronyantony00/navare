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
  testimonialData: Testimonial[];
}

const UsecaseTestimonials = ({ testimonialData, title, buttonText, tag }: UsecaseTestimonialsProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  const midpoint = Math.ceil(testimonialData.length / 2);
  const firstColumnData = testimonialData.slice(0, midpoint);
  const secondColumnData = testimonialData.slice(midpoint);
  return (
    <div className="w-full relative">
      <span className="absolute -left-space-50 top-space-300 w-space-200 h-space-200 bg-blue-circle-bg blur-[130px] rounded-full opacity-80"></span>
      <span className="absolute right-space-50 top-space-150 w-space-300 h-space-400 bg-primary-blur blur-[100px] rounded-full opacity-60"></span>
      <div className="max-w-maxwidth mx-auto section-padding-y section-padding-x">
        <div className="flex flex-col w-full h-full gap-space-40">
          <TextCombo
            title={titlePrefix || ''}
            spanText={titleHighlight || ''}
            extraTitle={titleSuffix || ''}
            titleClass="section-title"
            buttonOneText={buttonText || ''}
            buttonOneLink="/testimonials"
            smallText={tag || ''}
            className="flex justify-center items-center max-w-pct-090 sms:max-w-pct-065 2md:max-w-pct-050 mx-auto text-center"
          />
          <div className="flex flex-col md:flex-row items-start gap-x-space-25 md:gap-y-space-00 gap-y-space-16 w-full h-full">
            {/* First Column */}
            <div className="flex flex-col gap-y-space-16 flex-1">
              {firstColumnData.map((testimonial, index) => (
                <TestimonialSwiperCard
                  key={index + midpoint}
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

            {/* Second Column */}
            <div className="flex flex-col gap-y-space-16 flex-1">
              {secondColumnData.map((testimonial, index) => (
                <TestimonialSwiperCard
                  key={index + midpoint}
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
        </div>
      </div>
    </div>
  );
};

export default UsecaseTestimonials;
