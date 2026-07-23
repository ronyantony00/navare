'use client';
import type { Testimonial } from '@/types/apiTypes';
import dynamic from 'next/dynamic';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/atoms/CustomButton/Button';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import { formatDateToLongString } from '@/utils/textUtils';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const videoClassName = 'sm:h-space-125 rounded-lg overflow-hidden';

const VideoComponent = dynamic(
  () => import('@/components/atoms/VideoComponent/VideoComponent'),
  {
    ssr: false,
    loading: () => <div className={`${videoClassName} bg-black/10`} aria-hidden />,
  },
);

interface TestimonialVideoSectionProps {
  videoUrl?: string;
  testimonialData?: Testimonial[];
}

const TestimonialVideoSection = ({ testimonialData }: TestimonialVideoSectionProps) => {
  return (
    <div className="flex w-full max-w-maxwidth flex-col md:gap-space-40 gap-space-30">
      <div className="relative section-padding-y">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          navigation={{ prevEl: '.swiper-prev-btn', nextEl: '.swiper-next-btn' }}
          loop={true}
          className="w-full h-full"
          breakpoints={{
            680: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonialData?.map((item, index) => {
            const resolvedVideoUrl = getImageUrl(item?.thumbnailVideo?.url);

            return (
              <SwiperSlide key={item?.id ?? index} className="!h-full flex flex-col">
                <div className="flex flex-col gap-space-10 p-0 h-full scale-90 hover:scale-100 transition-all duration-300">
                  <VideoComponent
                    videoUrl={resolvedVideoUrl}
                    author={item?.authorName}
                    designation={item?.authorTitle}
                    className={videoClassName}
                    autoPlay
                    muted
                    playOnHover={false}
                    playButtonClass="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="text-size-2xs text-desc-text">
                    {item?.shortTestimonial}
                  </div>
                  <div className="text-size-4xs text-primary flex items-start gap-space-10">
                    <div>{item?.authorName}</div>
                    <div>{formatDateToLongString(item?.publishedAt || '')}</div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex gap-space-10 justify-center lg:mt-space-25 mt-space-15 z-50 overflow-hidden">
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
      </div>
    </div>
  );
};

export default TestimonialVideoSection;
