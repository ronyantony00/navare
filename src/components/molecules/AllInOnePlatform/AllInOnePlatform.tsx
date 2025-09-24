import type { HeadingDataItem } from '@/types/commonTypes';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/urlConstructor';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface AllInOnePlatformProps {
  headingData?: HeadingDataItem[];
}

interface ParsedPlatformData {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonOneText: string;
  buttonOneLink: string;
}

const AllInOnePlatform = ({ headingData }: AllInOnePlatformProps) => {
  const t = useTranslations('AllInOnePlatform');
  const platformData = useMemo((): ParsedPlatformData & { titlePrefix: string; titleHighlight: string; titleSuffix: string } => {
    const generalSection = headingData?.[0]?.generalSection;
    const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(generalSection?.title);
    const description = generalSection?.description ?? '';
    const buttonOneText = generalSection?.buttonText || '';
    const buttonOneLink = generalSection?.buttonLink || '';
    const coverImagePath = generalSection?.coverImage?.url;
    const imageUrl = coverImagePath ? getImageUrl(coverImagePath) : ImageConstants.Shipment.src;

    const imageAlt = titlePrefix
      ? `${titlePrefix} platform overview`
      : 'Platform dashboard overview';

    return {
      title: titlePrefix, // for compatibility, but not used directly
      description,
      imageUrl,
      imageAlt,
      titlePrefix,
      titleHighlight,
      titleSuffix,
      buttonOneText,
      buttonOneLink,
    };
  }, [headingData, t]);

  const styles = [
    '-bottom-space-03 -left-space-03',
    '-bottom-space-03 -right-space-03',
    '-top-space-03 -left-space-02',
    '-top-space-03 -right-space-03',
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center border-t border-border-color">
      <div className="w-full max-w-maxwidth mx-auto section-padding-x">
        <div className="relative w-full flex flex-col items-center justify-center xl:min-h-space-250 section-padding-y h-full border-b border-x border-border-color">
          {styles.map((style, index) => (
            <div key={index} className={`w-space-05 h-space-05 rotate-45 border-primary z-10 border absolute ${style} bg-navare-green`}></div>
          ))}
          <TextCombo
            title={platformData.titlePrefix}
            spanText={platformData.titleHighlight}
            extraTitle={platformData.titleSuffix}
            description={platformData.description}
            buttonOneText={platformData.buttonOneText}
            buttonOneLink={platformData.buttonOneLink || '/schedule-demo'}
            textClass="md:max-w-pct-060 max-w-pct-090"
            descClass="sm:w-pct-060 max-w-pct-090"
            className="flex items-center text-center z-50"
          />
          <span className="absolute top-pct-060 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary lg:size-space-160 size-space-100 rounded-full blur-3xl opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default AllInOnePlatform;
