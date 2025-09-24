import { useTranslations } from 'next-intl';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface ImageWithContentProps {
  headingData?: any;
}

const ImageWithContent = ({ headingData }: ImageWithContentProps) => {
  const t = useTranslations('ImageWithContentMain');
  return (
    <div className="w-full flex flex-col gap-space-30 md:py-space-30 py-space-20 px-space-15 md:px-space-40">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 max-w-maxwidth">
        <TextCombo
          spanClass="text-primary"
          title={headingData?.[0]?.automation_section[0].title?.[0]?.text || t('title')}
          spanText={headingData?.[0]?.automation_section[0].title?.[1]?.text || t('span_text')}
          description={headingData?.[0]?.automation_section[0].description || t('description')}
          titleClass="md:text-size-2xl text-size-2md"
          descClass="text-size-3xs"
          className="my-auto flex flex-col gap-space-08 leading-sub-title"
        />
        <Image
          src={headingData?.[0]?.automation_section[0].section_image?.url
            ? headingData[0].automation_section[0].section_image.url
            : ImageConstants.ServiceImageOne}
          width={500}
          height={400}
          alt="Process Improvements"
          className="size-full"
        />
      </div>
    </div>
  );
};

export default ImageWithContent;
