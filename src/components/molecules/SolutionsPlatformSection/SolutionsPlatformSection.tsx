import type { SolutionsPlatformSectionProps } from '@/types/commonTypes';
import Image from 'next/image';
import FeatureTabs from '@/components/atoms/SwiperCard/SwipperCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

const SolutionsPlatformSection = ({ tagText, featureTabData, titlePrefix, titleHighlight, description, solutionAdvantageData }: SolutionsPlatformSectionProps) => {
  const featureData = featureTabData?.[0]?.keyFeaturesSection.solution_feature_card || [];
  const solutionsData = solutionAdvantageData?.[0]?.advantagesListSection.advantage_item || [];

  const { titlePrefix: title, titleHighlight: spanText } = extractTitleParts(solutionAdvantageData?.[0]?.advantagesListSection?.title || {});

  const mid = Math.ceil(solutionsData.length / 2);

  const firstHalf = solutionsData.slice(0, mid);
  const secondHalf = solutionsData.slice(mid);

  const styles = [
    '-bottom-space-03 -left-space-03',
    '-bottom-space-03 -right-space-03',
    '-top-space-03 -left-space-02',
    '-top-space-03 -right-space-03',
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* First Section Starts here */}

      <div className="w-full border-y border-border-color">
        <div className="max-w-maxwidth mx-auto section-padding-x">
          <div className="flex flex-col items-center justify-center lg:gap-space-24 gap-space-08 relative section-padding-y px-space-05 2xs:px-space-10 md:px-space-15 border-x border-border-color min-w-0">
            <TextCombo
              smallText={tagText}
              title={titlePrefix}
              spanText={titleHighlight}
              description={description}
              titleClass="section-title"
              textClass="w-full max-w-full min-w-0"
              descClass="w-full max-w-pct-095 sm:w-pct-080 xl:w-pct-075"
              className="items-center text-center w-full min-w-0"
            />
            <FeatureTabs featureData={featureData} />
            {/* <div className="w-full rounded-sm"></div> */}
            {styles.map((style, index) => (
              <div key={index} className={`w-space-05 h-space-05 rotate-45 border-primary border absolute ${style} bg-navare-green`}></div>
            ))}
          </div>
        </div>
      </div>
      {/* First Section Ends here */}

      <div className="flex flex-col items-center justify-center lg:gap-space-23 gap-space-12 section-padding-y section-padding-x max-w-maxwidth">
        <div className="w-full sm:w-pct-085">
          <TextCombo
            spanClass="text-primary"
            title={title}
            spanText={spanText}
            titleClass="sub-heading"
            className="text-center"
          />
        </div>
        <div className="flex sm:flex-row flex-col size-full gap-space-20">
          <div className="flex flex-col gap-space-20 w-full justify-start items-start">
            {firstHalf.map((feature: any, index: number) => (
              <div key={index} className="flex items-start justify-start w-full gap-space-04 sm:gap-space-06 xl:gap-space-08 grow lg:flex-1">
                <Image
                  src={ImageConstants.AllInOnePoint}
                  alt="border"
                  width={20}
                  height={200}
                  className="self-start h-full min-h-space-80 object-contain object-top pt-space-01 shrink-0"
                />
                <div className="flex w-full grow flex-col gap-space-02 sm:gap-space-04 xl:gap-space-08">
                  <Image
                    src={getImageUrl(feature.icon.url)}
                    alt="icon"
                    height={30}
                    width={30}
                    className="size-space-14"
                  />
                  <span className="font-medium text-size-xs text-subtle-desc">
                    {feature.advantage_title}
                  </span>
                  <span className="text-desc-text">
                    {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Image src={ImageConstants.ManageShipmentCenterIcon} alt="border" width={100} height={100} className="w-full h-full flex-1 self-center lg:block hidden" />
          <div className="flex flex-col gap-space-20 w-full justify-start items-start">
            {secondHalf.map((feature: any, index: number) => (
              <div key={index} className="flex items-start justify-start w-full gap-space-04 sm:gap-space-06 xl:gap-space-08 grow lg:flex-1">
                <Image
                  src={ImageConstants.AllInOnePoint}
                  alt="border"
                  width={20}
                  height={200}
                  className="self-start h-full min-h-space-80 object-contain object-top pt-space-01 shrink-0"
                />
                <div className="flex w-full flex-col gap-space-02 sm:gap-space-04 xl:gap-space-08">
                  <Image
                    src={getImageUrl(feature.icon.url)}
                    alt="icon"
                    height={30}
                    width={30}
                    className="size-space-14"
                  />
                  <span className="font-medium text-size-xs text-subtle-desc">
                    {feature.advantage_title}
                  </span>
                  <span className="text-desc-text">
                    {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPlatformSection;
