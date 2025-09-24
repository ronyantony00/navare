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
    <div className="relative w-full max-w-maxwidth h-full section-padding-y section-padding-x">
      <Image
        src={ImageConstants.DotBg}
        alt="Dashboard Image"
        width={1000}
        height={1000}
        className="w-full h-full object-cover absolute top-0 left-0 "
      />
      <div className="flex xl:flex-row flex-col-reverse lg:gap-space-40 gap-space-08 items-center justify-center">
        <Image
          src={getImageUrl(image) || ImageConstants.SeaCargoThree}
          alt="Dashboard Image"
          width={1000}
          height={1000}
          className="w-full lg:h-space-340 lg:w-space-290 h-space-200 object-cover object-center flex-1 rounded-md z-50"
        />
        <div className="flex flex-col gap-space-12 flex-1 z-50">
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            description={description}
            className=""
            titleClass="section-title"
            textClass="2xs:max-w-pct-070"
            spanClass="text-primary"
            descClass="w-pct-095"
            btnClass="justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default SolutionPageScanningSolutions;

// className="border border-white w-full lg:max-h-space-340 lg:max-w-space-290 max-h-space-200 object-cover object-center flex-1 rounded-md z-50"
