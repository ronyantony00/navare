import type { title } from '@/types/usecase';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import TestimonialCard from '../AboutUsTestimonialCard/testimonialCard';

interface AboutusTestimonialProps {
  title?: title[];
  testimonialTitle?: string;
  authorName?: string;
  authorTitle?: string;
  shortTestimonial?: string;
  testimonial?: string;
  imageUrl?: string;
  backgroundImage?: string;
}

const AboutusTestimonial = ({ title, testimonialTitle, authorName, testimonial, imageUrl, backgroundImage }: AboutusTestimonialProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="w-full bg-navare-green border-white">
      <div className="max-w-maxwidth mx-auto section-padding-x section-padding-y flex flex-col gap-space-40">
        <TextCombo
          title={titlePrefix}
          spanText={titleHighlight}
          extraTitle={titleSuffix}
          className="text-center md:max-w-pct-080 mx-auto"
        />
        <TestimonialCard
          shortTestimonial={testimonial}
          clientName={authorName}
          title={testimonialTitle}
          imageUrl={imageUrl}
          backgroundImage={backgroundImage}
        />
      </div>
    </div>
  );
};

export default AboutusTestimonial;
