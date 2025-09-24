import Image from 'next/image';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';
import TextCombo from '../TextCombo/TextCombo';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const HeroSection = ({ title, description, buttonText, buttonLink }: HeroSectionProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full base:min-h-max-height relative">
      <Image src={ExternalMediaConstants.AboutUsHeroImage} priority alt="About Us Hero Image" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="max-w-maxwidth flex flex-col items-center justify-center section-padding-x section-padding-y relative z-10">
        <TextCombo
          title={title}
          description={description}
          buttonOneText={buttonText}
          buttonOneLink={buttonLink}
          titleClass="hero-title"
          className="text-center items-center md:max-w-pct-080 lg:max-w-pct-060 xl:max-w-pct-090"
        />
      </div>
    </div>
  );
};

export default HeroSection;
