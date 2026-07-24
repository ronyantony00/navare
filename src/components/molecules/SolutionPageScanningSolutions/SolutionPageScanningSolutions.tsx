import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface SolutionPageScanningSolutionsProps {
  description: string;
  titlePrefix: string;
  titleHighlight: string;
  image?: string;
}

const SolutionPageScanningSolutions = ({ description, titlePrefix, titleHighlight, image }: SolutionPageScanningSolutionsProps) => {
  return (
    <div className="relative w-full max-w-maxwidth h-full section-padding-x py-space-20 md:py-space-30 lg:py-space-20">
      <Image
        src={ImageConstants.DotBg}
        alt="Dashboard Image"
        width={1000}
        height={1000}
        className="w-full h-full object-cover absolute top-0 left-0 "
      />
      <div className="flex lg:flex-row flex-col-reverse gap-space-08 lg:gap-space-40 items-center w-full min-w-0">
        <div className="relative w-full h-space-200 lg:h-auto lg:w-1/2 lg:max-w-pct-050 lg:aspect-[16/11] min-w-0 shrink overflow-hidden rounded-md z-50">
          <Image
            src={getImageUrl(image) || ImageConstants.SeaCargoThree}
            alt="Dashboard Image"
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-space-12 w-full lg:w-1/2 min-w-0 z-50">
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            description={description}
            className=""
            titleClass="section-title"
            textClass="2xs:max-w-pct-070 lg:max-w-full"
            spanClass="text-primary"
            descClass="w-pct-095 lg:max-w-pct-090"
            btnClass="justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default SolutionPageScanningSolutions;
