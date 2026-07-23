import type { SolutionsHeroSectionProps } from '@/types/commonTypes';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';

const SolutionsHeroSection = ({ titlePrefix, description, bannerImage, buttonText }: SolutionsHeroSectionProps) => {
  return (
    <div className="section-padding-y relative section-padding-x bg-no-repeat bg-cover w-full h-full flex flex-col items-center justify-center">
      <Image src={ExternalMediaConstants.SolutionHeroImage} alt="Solutions Hero Image" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <TextCombo
          title={titlePrefix}
          description={description}
          bannerImage={bannerImage}
          buttonOneText={buttonText}
          textClass="sm:max-w-pct-080"
          buttonOneLink="/schedule-demo"
          descClass="w-pct-080"
          className="items-center justify-center text-center max-w-maxwidth z-10"
          titleClass="hero-title"
          btnClass="justify-center"
        />
      </div>
    </div>
  );
};

export default SolutionsHeroSection;
