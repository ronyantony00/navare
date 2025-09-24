import type { featureCard, title } from '@/types/usecase';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import UseCaseSvgImage from '@/components/atoms/UseCaseSvgImage/UseCaseSvgImage';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import FeatureCardContainer from '../FeatureCardContainer/FeatureCardContainer';

interface FeatureSectionProps {
  title: title[];
  tag: string;
  featureCards: featureCard[];
  image?: string;
}

const FeaturesSection = ({ featureCards, title, tag, image }: FeatureSectionProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="bg-navare-green relative overflow-hidden">
      <Image src={ImageConstants.DotsPattern} alt="pattern" width={550} height={550} className="absolute right-0 top-space-125 2md:bottom-space-65" />
      <span className="absolute right-space-20 bottom-0 w-space-150 h-space-100 bg-secondary-blur blur-[150px] rounded-full opacity-80"></span>
      <span className="absolute -right-space-70 top-space-100 w-space-150 h-space-100 bg-secondary-blur blur-[100px] rounded-full opacity-70"></span>
      <div className="max-w-maxwidth mx-auto section-padding-x section-padding-y">
        <div className="flex flex-col gap-space-28">
          <div className="flex flex-col gap-space-06 text-center items-center">
            <div className="very-small-heading text-primary">{tag || 'Other Use Cases'}</div>
            <TextCombo
              title={titlePrefix}
              spanText={titleHighlight}
              extraTitle={titleSuffix}
              className="md:max-w-pct-085"
              titleClass="section-title"
              descClass="primary-content"
            />
          </div>
          {/* <div className="flex flex-col-reverse 2md:grid 2md:grid-cols-[1fr_auto] gap-space-33 items-start"> */}
          <div className="flex flex-col-reverse lg:flex-row gap-space-33">
            <div className="flex-1">
              <FeatureCardContainer featureCards={featureCards} />
            </div>
            <div className="flex-1">
              <UseCaseSvgImage
                imageUrl={getImageUrl(image) || ImageConstants.FeatureImage}
                className="z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
