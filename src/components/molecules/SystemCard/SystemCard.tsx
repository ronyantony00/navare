import type { title } from '@/types/usecase';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/components/atoms/CustomButton/Button';
import SectionHeader from '@/components/atoms/SectionHeading/SectionHeading';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface SystemCardProps {
  title?: title[];
  sectionDescription?: string;
  buttonLink?: string;
  media?: string;
}

const SystemCard = ({ title, sectionDescription, buttonLink, media }: SystemCardProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  const t = useTranslations('FreightSection');
  return (
    <div className="max-w-section-max-width mx-auto mt-space-20 px-space-12 mb-space-50">
      <div className="border border-subtle-border rounded-sm pt-space-30 p-space-15 2md:py-space-30 2md:pl-space-30 2md:pr-space-10 relative">
        <div className="flex flex-col-reverse 2md:flex-row">
          <div className="flex flex-col justify-center gap-space-10 2md:w-1/2">
            {/* <div className="text-size-lg-2 leading-very-tight sm:text-size-xl-2 md:text-size-2xl md:leading-display-medium  text-secondary-text font-medium">{title || t('title')}</div> */}
            <SectionHeader titlePrefix={titlePrefix || t('title')} titleHighlight={titleHighlight} titleSuffix={titleSuffix} variant="medium" />
            <div className="text-size-3xs text-subtle-text leading-normal">{sectionDescription || t('description')}</div>
            <Button variant="primary" animation={true} arrow={true} text={t('buttonTextOne')} mainClass="max-w-space-114" link={buttonLink || '/###'} />
          </div>
          <div className="flex justify-center items-center 2md:w-1/2">
            <Image src={media || ImageConstants.GreenGlob} width={500} height={500} alt="api-card-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCard;
