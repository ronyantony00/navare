import type { title } from '@/types/usecase';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface SolutionSectionProps {
  title?: title[];
  description?: string;
  subDescription?: string;
  mainImage?: string;
  subImage?: string;
}

const SolutionSection = ({ title, description, subDescription, mainImage, subImage }: SolutionSectionProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="relative z-10 overflow-hidden md:overflow-visible">
      <span className="absolute left-space-80 top-space-150 w-space-200 h-space-150 rotate-45 bg-primary-blur blur-[100px] rounded-full opacity-100"></span>
      <span className="absolute left-space-80 bottom-space-10 w-space-150 h-space-200 -rotate-25 bg-secondary-blur blur-[100px] rounded-full opacity-60"></span>
      <div className="max-w-maxwidth mx-auto section-padding-x section-padding-y">
        <div className="flex flex-col md:flex-row md:gap-space-19">
          <div className="flex flex-col md:w-1/2 z-10">
            <TextCombo
              title={titlePrefix || 'The Solution That Changed '}
              spanText={titleHighlight || ' Everything'}
              extraTitle={titleSuffix || ''}
              titleClass="section-title"
              descClass="primary-content"
              className=""
              description={description || 'At the same time, a lot of vets - whether theyre just starting out, or have years of experience in clinics are always looking for ways to expand their income and client base.  At the same time, a lot of vets - whether they are just starting out, or have years of experience in clinics are always looking for ways to expand their income and client base. '}
            />
            <div className="mt-space-05 md:mt-space-30 xl:mt-space-77 2md:ml-space-14 rounded-lg overflow-hidden">
              <Image src={getImageUrl(subImage) || ImageConstants.SolutionSubImage} alt="solution-sub-image" width={600} height={357} className="max-h-space-175 w-full" />
            </div>
            <div className="primary-content text-desc-text mt-space-15 md:mt-space-31 mb-space-22">
              { subDescription || 'Before grapes become wine, they need to be carefully harvested, packed, and transported. For Vineo Wines, delivering fresh, high-quality grapes on time is a constant challenge. Every crate shows how important timing is — even a small delay can impact the wine’s quality.' }
            </div>
          </div>
          <div className="md:w-1/2 md:aspect-[594/928] rounded-lg overflow-hidden xl:mt-auto max-h-pct-040 md:max-h-full xl:max-h-pct-080 md:max-w-space-300 z-10">
            <Image src={getImageUrl(mainImage) || ImageConstants.SolutionMainImage} width={594} height={928} alt="solutions-image" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;
