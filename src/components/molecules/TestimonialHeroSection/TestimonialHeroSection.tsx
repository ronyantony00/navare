import Image from 'next/image';
import Spinner from '@/components/atoms/Spinner/Spinner';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface TestimonialHeroSectionProps {
  loading: boolean;
  titlePrefix?: string;
  description?: string;
}

const TestimonialHeroSection = ({ loading, titlePrefix, description }: TestimonialHeroSectionProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-full base:min-h-max-height relative">
      <Image
        src={ImageConstants.TestimonialHeroBgImage}
        priority
        alt="Testimonial Hero Background"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="max-w-maxwidth flex flex-col items-center justify-center section-padding-x section-padding-y relative z-10">
        <TextCombo
          title={titlePrefix}
          description={description}
          className="text-center items-center justify-center max-w-maxwidth"
          textClass="lg:max-w-pct-050 md:max-w-pct-060"
          titleClass="hero-title"
          descClass="lg:max-w-pct-050 md:max-w-pct-060 max-w-pct-090"
        />
      </div>
    </div>
  );
};

export default TestimonialHeroSection;
