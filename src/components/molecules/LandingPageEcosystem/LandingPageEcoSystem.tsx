'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/atoms/CustomButton/Button';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface LandingPageEcoSystemProps {
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  clientLogo?: any[];
  maxLogos?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  logosPerSlide?: number;
}

const LandingPageEcoSystem = ({
  titlePrefix,
  titleHighlight,
  description,
  clientLogo,
  maxLogos,
  showNavigation = true,
  showPagination = true,
  logosPerSlide = 3,
}: LandingPageEcoSystemProps) => {
  const t = useTranslations('commonMessages');
  const chunkArray = (array: any[], size: number): any[][] => {
    const chunks: any[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const logoData = clientLogo?.slice(0, maxLogos || clientLogo?.length) || [];
  const logoChunks = chunkArray(logoData, logosPerSlide);

  return (
    <div className="relative h-full w-full items-center overflow-hidden flex flex-col gap-space-30">
      <div className="bg-[#061611E3] opacity-30 absolute w-full h-full"></div>
      <span className="absolute top-space-85 w-space-125 h-space-220 -left-space-184 bg-secondary-blur rounded-full blur-[var(--blur-intensity)] opacity-90"></span>
      <span className="absolute top-space-60 w-space-100 h-space-150 -right-space-200 bg-primary-blur rounded-full blur-[var(--blur-intensity)] opacity-70"></span>
      <div className="flex flex-col w-full justify-between max-w-maxwidth lg:gap-space-24 gap-space-08 section-padding-y section-padding-x z-20 h-full">
        <div className="">
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            description={description}
            className="text-center justify-center items-center"
            textClass="xl:max-w-pct-050 md:max-w-pct-070 sm:max-w-pct-070"
            descClass="lg:max-w-pct-040 sm:max-w-pct-060"
          />
        </div>
        <div className="relative mx-auto w-full">
          <div className="mx-auto w-full !h-full px-space-30">
            {logoChunks.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
                navigation={{ prevEl: '.swiper-prev-btn', nextEl: '.swiper-next-btn' }}
                loop={true}
                className="w-full !h-full"
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1420: {
                    slidesPerView: 5,
                    spaceBetween: 80,
                  },
                }}
              >
                {logoChunks.map((logoGroup, slideIndex) => (
                  <SwiperSlide key={slideIndex} className="!h-full">
                    <div className="flex w-full h-full justify-center items-center flex-col lg:gap-space-30 gap-space-05">
                      {logoGroup.map((logo: any) => (
                        <div
                          key={logo.id}
                          className="h-full "
                        >
                          <Image
                            src={getImageUrl(logo.logo.url)}
                            alt={logo.logo.alternativeText || logo.clientName}
                            width={120}
                            height={80}
                            className="object-contain w-full max-w-pct-080 mx-auto h-full min-h-space-50"
                            // loading="lazy"
                            priority={slideIndex === 0}
                          />
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {showNavigation && logoChunks.length > 1 && (
              <div className="absolute w-full flex justify-between left-0 top-pct-050 -translate-y-1/2 z-10">
                <Button
                  variant="rounded"
                  text=""
                  arrow
                  arrowDirection="left"
                  mainClass="swiper-prev-btn"
                  arrowClassName="size-space-10"
                />
                <Button
                  variant="rounded"
                  text=""
                  arrow
                  arrowDirection="right"
                  mainClass="swiper-next-btn"
                  arrowClassName="size-space-10"
                />
              </div>
            )}

            {showPagination && logoChunks.length > 1 && (
              <div className="swiper-pagination-custom flex justify-center mt-space-06 gap-2"></div>
            )}
          </div>

          {logoChunks.length === 0 && (
            <div className="flex flex-col gap-space-10 max-w-md mx-auto">
              <div className="text-center text-gray-400">{t('noLogosAvailable')}</div>
            </div>
          )}
        </div>
      </div>

      {/* <div className="md:flex absolute hidden top-0 left-0 w-full h-full z-10">
        <Image
          src={ImageConstants.LeftCircleBg}
          alt="Technology Section"
          width={1000}
          height={1000}
          className="size-full object-cover p-space-10 relative -left-pct-010"
        />
        <div className="mr-space-100">
          <Image
            src={ImageConstants.RightCircleBg}
            alt="Technology Section"
            width={1000}
            height={1000}
            quality={100}
            className="h-full w-full object-cover p-space-10 relative object-start"
          />
        </div>
      </div> */}
    </div>
  );
};

export default LandingPageEcoSystem;
