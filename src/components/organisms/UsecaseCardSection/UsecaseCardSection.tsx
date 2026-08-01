import type { CardContent, title } from '@/types/usecase';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import UsecaseCardContainer from '../UsecaseCardContainer/UsecaseCardContainer';

interface CardSectionProps {
  CardData: CardContent[];
  title: title[];
  sectionDescription: string;
}

const UsecaseCardSection = ({ CardData, title, sectionDescription }: CardSectionProps) => {
  const t = useTranslations('commonMessages');
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <section className="bg-navare-green py-space-15 md:py-space-30 relative">
      <Image src={ImageConstants.combinedShape} width={200} height={190} alt="grid" className="absolute top-0 right-0 z-0" />
      <div className="max-w-maxwidth section-padding-x mx-auto flex flex-col md:gap-space-15 2md:gap-space-27 z-50">
        <TextCombo
          title={titlePrefix}
          spanText={titleHighlight}
          extraTitle={titleSuffix}
          description={sectionDescription}
          className="text-center mx-auto"
          descClass="max-w-pct-080 2md:max-w-pct-060 mx-auto"
        />
        {CardData && CardData.length > 0
          ? (
              <UsecaseCardContainer CardData={CardData} />
            )
          : (
              <div className="py-space-20">
                <div className="text-size-sm text-subtle-text text-center">{t('no_content_found')}</div>
              </div>
            )}
      </div>
    </section>
  );
};

export default UsecaseCardSection;
