import type { SolutionsOurCaseProps } from '@/types/commonTypes';
import FeatureCard from '@/components/atoms/FeatureCard/FeatureCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { getImageUrl } from '@/utils/urlConstructor';

const SolutionsOurUseCase = ({ ourCaseData, smallTitle, titlePrefix, titleHighlight }: SolutionsOurCaseProps) => {
  const featureCardData = ourCaseData
    ? ourCaseData.flatMap(item => item.usecasesSection.solution_usecase_card)
    : [];

  const mid = featureCardData ? Math.ceil(featureCardData.length / 2) : 0;
  const featureCardData1 = featureCardData ? featureCardData.slice(0, mid) : [];
  const featureCardData2 = featureCardData ? featureCardData.slice(mid) : [];
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-space-30 section-padding-x section-padding-y max-w-maxwidth overflow-hidden base:overflow-visible relative">
      <span className="bg-[#185A43C4] rounded-full opacity-80 blur-[100px] w-space-200 h-space-200 -left-space-50 top-space-125 absolute"></span>
      <TextCombo
        smallText={smallTitle}
        spanClass="text-primary"
        title={titlePrefix}
        spanText={titleHighlight}
        titleClass="section-title"
        descClass="primary-content"
        description={ourCaseData?.[0]?.usecasesSection?.description ?? ''}
        className="w-full flex-1 my-auto z-10 lg:max-w-pct-080"
        buttonOneText={ourCaseData?.[0]?.usecasesSection?.buttonText ?? ''}
        buttonOneLink="/schedule-demo"
      />
      <div className="flex-1 flex sm:flex-row flex-col lg:gap-x-space-10 lg:gap-y-space-00 lg:gap-space-10 gap-space-20">
        <div className="grid grid-cols-1 gap-space-20 w-full">
          {/* First half */}
          {featureCardData1.map((feature: any, index: number) => (
            <FeatureCard
              key={index}
              title={feature.card_title}
              description={feature.card_description}
              image={getImageUrl(feature.logo.url)}
              mainClass="border-r border-border-color rounded-sm usecase-card-bg"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-space-20 sm:w-pct-080 sm:mb-space-30">
          {/* Second half */}
          {featureCardData2.map((feature: any, index: number) => (
            <FeatureCard
              key={index}
              title={feature.card_title}
              description={feature.card_description}
              image={getImageUrl(feature.logo.url)}
              mainClass="rounded-sm usecase-card-bg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SolutionsOurUseCase;
