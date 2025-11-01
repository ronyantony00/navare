import type { title } from '@/types/usecase';
import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import TextCombo from '../TextCombo/TextCombo';

interface FooterSectionProps {
  title: title[];
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

const FooterSection = ({ title, description, buttonText, buttonLink, image }: FooterSectionProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  // console.warn('FOOTER IMAGE', image);
  return (
    <div className="max-w-maxwidth mx-auto section-padding-y section-padding-x">
      <div className="rounded-md-3 border-b border-border-color w-full w-full relative overflow-hidden">
        <Image src={getImageUrl(image) || ImageConstants.PhoneIllustration} width={1280} height={547} alt="phone-image" className="absolute object-cover w-full h-full z-0" />
        <div className="flex items-center justify-center py-space-20 px-space-10 2xs:p-space-20 md:py-space-40 xl:py-space-69 md:pl-space-30 lg:pl-space-45">
          <TextCombo
            title={titlePrefix || 'Unlock Efficiency Across Your '}
            spanText={titleHighlight || 'Supply Chain'}
            extraTitle={titleSuffix || ''}
            description={description || 'Navare delivers end-to-end visibility, intelligent automation, and faster execution—helping logistics teams reduce delays, cut costs, and scale with confidence.'}
            descClass="secondary-content 2xs:max-w-pct-090"
            titleClass="sub-heading"
            buttonOneText={buttonText || 'Book a Demo'}
            buttonOneLink={buttonLink || '/schedule-demo'}
            className="sm:max-w-pct-080 2md:max-w-pct-055 xl:max-w-pct-045 mr-auto z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
