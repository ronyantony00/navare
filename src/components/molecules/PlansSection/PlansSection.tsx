'use client';
import type { Swiper as SwiperType } from 'swiper';
import type { PlansSectionProps } from '@/types/commonTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlanCard from '@/components/atoms/PlanCard/PlanCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ToggleButton from '@/components/atoms/ToggleButton/ToggleButton';
import { usePlanSorting } from '@/hooks/usePlanSorting';
import 'swiper/css';

const PlansSection = ({ plansSectionData, titlePrefix, titleHighlight, description, titleSuffix }: PlansSectionProps) => {
  const [isYearly, setIsYearly] = useState(false);
  const t = useTranslations('ImageWithContent');
  const swiperRef = useRef<SwiperType | undefined>(undefined);

  const sortedPlans = usePlanSorting({ plansSectionData, isYearly });

  return (
    <div className="max-w-maxwidth w-full section-padding-x section-padding-y mx-auto bg-navare-green relative overflow-hidden base:overflow-visible">
      <span className="absolute top-space-150 rotate-45 left-space-410 bg-plan-section-blur w-space-325 h-space-100 blur-[150px] opacity-90"></span>
      <div className="w-full flex flex-col gap-space-20 md:gap-space-40">
        <div className="flex flex-col text-center 2md:max-w-pct-060 mx-auto z-10">
          <div className="text-size-3xs font-bold text-primary mb-space-06">{t('key_features')}</div>
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            extraTitle={titleSuffix}
            description={description}
            className="my-auto flex flex-col gap-space-04 leading-sub-title"
          />
          <div className="text-size-3xs font-normal text-white mt-space-12">
            {t('right_plan')}
          </div>
          <div className="mt-space-16">
            <ToggleButton leftLabel={t('monthly')} rightLabel={t('yearly')} onChange={setIsYearly} />
          </div>
        </div>
        <div className="w-full z-10 overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 13,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 13,
              },
            }}
            className="w-full plans-swiper"
          >
            {sortedPlans?.map((plan: any, index: number) => (
              <SwiperSlide key={index} className="!h-full my-auto">
                <PlanCard
                  key={index}
                  planType={plan.planName}
                  planTier={plan.planTier}
                  planBadge={plan.tag}
                  planTypeName={plan.planTypeName}
                  description={plan.description}
                  features={plan.product_features}
                  mainClass="h-full"
                  planDuration={isYearly ? 'yearly' : 'monthly'}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons at Bottom */}
          <div className="flex justify-center items-center gap-space-16 mt-space-20 2md:hidden">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-space-20 h-space-20 rounded-full bg-primary duration-200 flex items-center justify-center group"
              aria-label="Previous slide"
            >
              <Image src="/assets/icons/left-arrow.svg" alt="left-arrow" width={20} height={20} />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-space-20 h-space-20 rounded-full bg-primary flex items-center justify-center group 2md:hidden"
              aria-label="Next slide"
            >
              <Image src="/assets/icons/right-arrow.svg" alt="right-arrow" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSection;
