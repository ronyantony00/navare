import type { HeadingDataItem } from '@/types/commonTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface PremiumOnboardingProps {
  headingData?: HeadingDataItem[];
}

const PremiumOnboarding = ({ headingData }: PremiumOnboardingProps) => {
  const t = useTranslations('PremiumOnboarding');
  return (
    <div className="w-full lg:h-screen flex flex-col gap-space-30 md:py-space-30 py-space-20 px-space-15 md:px-space-40">
      <div className="flex lg:flex-row flex-col gap-space-40">
        <Image
          src={headingData?.[0]?.aboutSection?.image?.url
            ? headingData[0].aboutSection.image.url
            : ImageConstants.PremiumImage}
          alt="premium image"
          width={400}
          height={650}
          className="w-full rounded-lg max-w-space-240 flex-1"
        />

        <div className="flex flex-col gap-space-10 justify-center flex-1">
          <TextCombo
            spanClass="text-primary"
            bannerText={headingData?.[0]?.aboutSection?.tag || t('banner_text')}
            title={headingData?.[0]?.aboutSection?.title[0]?.text || t('title')}
            description={headingData?.[0]?.aboutSection?.description || t('description')}
            className="md:text-size-2xl text-size-2md flex items-start gap-space-10 leading-sub-title"
          />
          <div className="grid grid-cols-2 gap-space-05">
            {headingData?.[0]?.aboutSection?.bullet_point?.map((card: any) => (
              <div key={card.id} className="flex gap-space-05">
                <Image
                  src={ImageConstants.CheckGreen}
                  alt="green tick"
                  className="size-space-12"
                />
                <div className="">
                  {card.bullet_point_item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumOnboarding;
