import type { Highlight } from '@/types/interfaces';
import type { title } from '@/types/usecase';
import Image from 'next/image';
import AboutUsSvgImage from '@/components/atoms/AboutUsSvgImage/AboutUsSvgImage';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/urlConstructor';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface titleSection {
  title: title[];
  description: string;
  tag: string;
}

interface benefit {
  id: number;
  title: string;
}

interface AboutContentProps {
  titleSection?: titleSection | undefined;
  highlightFeatures?: Highlight[] | undefined;
  benefitPoints?: benefit[] | undefined;
  mainImage: string;
  subImage: string;
  mainTextOnImage?: string;
  smallTextOnImage?: string;
}

const WhoWeAreSection = ({ titleSection, highlightFeatures, benefitPoints, mainImage, subImage, mainTextOnImage, smallTextOnImage }: AboutContentProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(titleSection?.title);
  // console.warn('MAIN IMAGE:', mainImage);
  // console.warn('SUB IMAGE:', subImage);
  return (
    <div className="max-w-maxwidth mx-auto section-padding-x section-padding-y flex flex-col-reverse items-center justify-center 2md:flex-row gap-space-20 lg:gap-space-40 relative 2k:overflow-visible overflow-hidden">
      <Image src="/assets/images/about-us/Combined-Shape.svg" alt="about content" width={200} height={200} className="top-0 right-0 absolute z-10 rotate-270" />
      <Image src="/assets/images/about-us/Combined-Shape.svg" alt="about content" width={106} height={112} className="absolute top-space-150 -left-space-40 rotate-180" />
      <span className="absolute top-space-0 lg:w-space-290 lg:h-space-215 size-space-100 -right-space-40 bg-primary-blur rounded-full blur-[var(--blur-intensity)] opacity-80"></span>
      <div className="relative flex-1">
        <span className="absolute top-space-50 lg:w-space-290 lg:h-space-215 size-space-100 left-space-150 bg-primary-blur rounded-full blur-[var(--blur-intensity)] opacity-60"></span>
        <div className="flex flex-col">
          <TextCombo
            smallText={titleSection?.tag}
            title={titlePrefix}
            spanText={titleHighlight}
            extraTitle={titleSuffix}
            description={titleSection?.description}
            descClass=""
            className="z-10"
          />
          {highlightFeatures && (
            <div className="flex sm:flex-row flex-col md:gap-space-20 gap-space-10 mt-space-16 z-10">
              {highlightFeatures.map((feature, index) => {
                const iconUrl = typeof feature?.icon === 'string' ? feature?.icon : getImageUrl(feature?.icon?.url);
                return (
                  <div key={index} className="flex items-center gap-space-10 pr-space-10">
                    <Image src={iconUrl} alt={feature.title} width={40} height={40} />
                    <div className="small-card-heading text-text-placeholder">{feature.title}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="border-t border-primary pt-space-16 mt-space-30 flex flex-col gap-space-06">
            {benefitPoints && benefitPoints.map((point, index) => (
              <div key={index} className="flex gap-space-10">
                <Image src={ImageConstants.greenCheck} alt="check" width={24} height={24} />
                <div className="small-content text-subtle-desc">{point.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto my-auto relative z-30 2md:w-full w-pct-080 flex-1">
        <div className="absolute max-w-space-70 z-20 sm:top-space-50 top-space-10 -left-pct-010 bg-blue-light-shade w-fit text-center h-auto md:min-w-space-70 rounded-sm aspect-square flex flex-col items-center justify-center p-space-10">
          <div className="text-white card-title">{mainTextOnImage}</div>
          <div className="text-white card-heading">{smallTextOnImage}</div>
        </div>
        <AboutUsSvgImage
          imageUrl1={getImageUrl(mainImage) || ImageConstants.whoWeAreSectionImage}
          imageUrl2={getImageUrl(subImage) || ImageConstants.experienceBadge}
        />
      </div>
    </div>
  );
};

export default WhoWeAreSection;
