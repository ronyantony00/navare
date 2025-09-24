import type { title } from '@/types/usecase';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface SeamlessIntegrationProps {
  tag?: string;
  title?: title[];
  description?: string;
  buttonOneText?: string;
  buttonOneLink?: string;
  image?: string;
}

const SeamlessIntegration = ({ tag, title, description, buttonOneText, buttonOneLink, image }: SeamlessIntegrationProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="relative w-full flex flex-col items-center justify-center border-t border-border-color section-padding-y gap-space-30 ">
      <div className="w-full max-w-maxwidth section-padding-x">
        <div className="w-full flex flex-col sm:flex-row lg:gap-space-40 gap-space-20 items-center justify-start z-30 ">
          <TextCombo
            smallText={tag}
            title={titlePrefix}
            spanText={titleHighlight}
            extraTitle={titleSuffix}
            description={description}
            buttonOneText={buttonOneText || 'Contact Us'}
            buttonOneLink={buttonOneLink || '/contact-us'}
            className="z-30 sm:max-w-pct-050 max-w-pct-090 sm:items-start sm:justify-start items-center justify-center"
            textClass="text-center sm:text-left"
            descClass="sm:max-w-pct-080 max-w-pct-090 sm:text-left text-center"
          />
          <Image
            src={getImageUrl(image) || ImageConstants.SeaCargoThree}
            width={346}
            height={454}
            alt="Process Improvements"
            className="z-30 mx-auto object-cover rounded-md-2 max-h-space-300 2xs:aspect-[454/600]"
          />
          <Image
            src={ImageConstants.DotBg}
            width={375}
            height={375}
            alt="Process Improvements"
            className="absolute top-0 left-0 size-full object-cover z-10"
          />
        </div>
      </div>
    </div>
  );
};
export default SeamlessIntegration;
