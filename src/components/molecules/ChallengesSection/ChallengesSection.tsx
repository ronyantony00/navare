import type { title } from '@/types/usecase';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface ChallengesSectionProps {
  title?: title[];
  description?: string;
  image?: { url: string };
}

const ChallengesSection = ({ title, description }: ChallengesSectionProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="max-w-maxwidth mx-auto section-padding-y bg-navare-green w-full h-full relative">
      <Image
        src={ImageConstants.ChallengesPageImage}
        // src={ExternalMediaConstants.UsecaseChallengesImage}
        alt="challenges-image"
        width={1440}
        height={457}
        className="min-h-space-200 object-cover"
      />
      <div className="relative -mt-[3%] 2md:-mt-[6%]">
        <div
          className="w-full relative sm:max-w-pct-085 2md:max-w-pct-075 section-padding-x pt-space-10 sm:pt-space-20 2md:pt-space-23 2md:pb-space-22 challenge-clip-path"
        >
          <Image src={ImageConstants.GreenPolygon} className="w-full h-full absolute top-0 bottom-0 right-0 left-0 -z-10" alt="polygon-green" width={1096} height={387} />
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            extraTitle={titleSuffix}
            description={description}
            titleClass="section-title"
            descClass="secondary-content"
            className="max-w-pct-080"
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;
