import Image from 'next/image';
import TestimonialSwiperCard from '@/components/atoms/TestimonialSwiperCard/TestimonialSwiperCard';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface TestimonialCardProps {
  shortTestimonial?: string;
  clientName?: string;
  designation?: string;
  title?: string;
  imageUrl?: string;
  backgroundImage?: string;
}

const TestimonialCard = ({ shortTestimonial, clientName, designation, title, imageUrl, backgroundImage }: TestimonialCardProps) => {
  return (
    <div className="w-full md:min-h-space-270 min-h-space-200 rounded-md-3 overflow-hidden relative border border-primary">
      <Image src={getImageUrl(backgroundImage) || '/assets/images/about-us/testimonialCardBg.jpg'} alt="background" width={1270} height={541} className="w-full h-full object-cover object-center absolute inset-0" />
      <div className="absolute bottom-space-05 right-space-05 left-space-05 sm:top-pct-010 sm:left-pct-010 sm:bottom-auto">
        <TestimonialSwiperCard
          variant="aboutus"
          className="aboutus-testimonial-gradient w-full max-w-space-215"
          title={title}
          shortTestimonial={shortTestimonial}
          clientName={clientName}
          designation={designation}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
