import type { TechnologySection } from '@/types/commonTypes';
import RiveTextController from '@/components/atoms/RiveComponent/RiveComponent';
// import RiveComponent from '@/components/atoms/RiveComponent/RiveComponent';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface FreightSectionProps {
  solutionData: TechnologySection;
  animationText?: string;
}

const FreightSection = ({ solutionData, animationText }: FreightSectionProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(solutionData?.titleSection?.title);

  const showAnimation = solutionData?.showAnimation ?? true;

  if (!showAnimation) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-space-30 section-padding-x section-padding-y max-w-maxwidth">
      <div className="flex w-full flex-col gap-16 items-center justify-center">
        <TextCombo
          smallText={solutionData?.titleSection?.tag || 'The Technology'}
          title={titlePrefix}
          spanText={titleHighlight}
          extraTitle={titleSuffix}
          description={solutionData?.titleSection?.description}
          buttonOneText={solutionData?.buttonText || 'Book a Demo'}
          buttonOneLink={solutionData?.buttonLink || '/schedule-demo'}
          className="w-full items-center justify-center text-center mx-auto md:max-w-pct-080"
          descClass="primary-content max-w-pct-080 lg:max-w-pct-060"
        />
        <RiveTextController
          src="/assets/animation/apiNew.rive"
          text={animationText || 'NavOne'}
          textInputName="api"
          className="lg:w-[776px] lg:h-[638px] sm:w-[500px] sm:h-[400px] w-[320px] h-[300px]"
        />
      </div>
    </div>
  );
};

export default FreightSection;
