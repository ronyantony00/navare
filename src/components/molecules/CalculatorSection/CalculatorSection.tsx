import { useTranslations } from 'next-intl';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

const CalculatorSection = () => {
  const t = useTranslations('CalculatorSection');
  return (
    <div className="w-full flex flex-col gap-space-30 md:py-space-30 py-space-20">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 max-w-maxwidth">
        <TextCombo
          spanClass="text-primary"
          title={t('title')}
          spanText={t('span_text')}
          description={t('description')}
          buttonOneText={t('buttonTextOne')}
          titleClass="md:text-size-2xl text-size-2md"
          descClass="text-size-3xs"
          className="my-auto flex flex-col gap-space-08 leading-sub-title"
        />
        <Image
          src={ImageConstants.Calculator}
          width={375}
          height={375}
          alt="Process Improvements"
          className="size-fit mx-auto"
        />
      </div>
    </div>
  );
};

export default CalculatorSection;
