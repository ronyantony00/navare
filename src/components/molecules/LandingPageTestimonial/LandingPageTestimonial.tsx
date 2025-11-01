'use client';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/atoms/CustomButton/Button';
import TestimonialSwiperCard from '@/components/atoms/TestimonialSwiperCard/TestimonialSwiperCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import VideoComponent from '@/components/atoms/VideoComponent/VideoComponent';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface LandingPageTestimonialProps {
  smallText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  testimonialData?: any[];
  videoUrl?: string;
  className?: string;
  textClass?: string;
  descClass?: string;
  mainClass?: string;
}

const LandingPageTestimonial = ({ smallText, titlePrefix, titleHighlight, description, testimonialData, videoUrl, className, descClass, textClass, mainClass }: LandingPageTestimonialProps) => {
  // console.warn('Rendering LandingPageTestimonial with testimonialData:', testimonialData);
  return (
    <div className="w-full flex flex-col items-center justify-center section-padding-y relative overflow-hidden">
      <span className="w-space-75 h-space-75 bg-secondary-blur blur-[80px] opacity-80 absolute top-space-150 right-space-00"></span>
      <div className={`w-full max-w-maxwidth flex flex-col items-center ${mainClass || 'lg:gap-space-40 gap-space-20'}`}>
        <div className="lg:gap-space-40 gap-space-08 section-padding-x w-full flex lg:flex-row flex-col">
          <TextCombo
            smallText={smallText}
            title={titlePrefix}
            spanText={titleHighlight}
            description={description}
            className={`${className || 'items-start z-20'}`}
            textClass={`${textClass || 'lg:max-w-pct-100 md:max-w-pct-070 sm:max-w-pct-060'}`}
            descClass={`${descClass || 'lg:max-w-pct-080 sm:max-w-pct-080'}`}
          />
          {videoUrl && (
            <VideoComponent
              videoUrl={videoUrl}
              className="rounded-lg overflow-hidden border border-border-color lg:max-h-space-150 aspect-video lg:max-w-space-270 w-full lg:ml-auto lg:mx-0 mx-auto"
              videoOverLay="testimonial-video-bg"
              autoPlay={true}
            />
          )}
        </div>
        <div className="relative w-full section-padding-x">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            navigation={{ prevEl: '.swiper-prev-btn', nextEl: '.swiper-next-btn' }}
            loop={true}
            // pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 36,
              },
            }}
          >
            {testimonialData?.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto xl:min-w-pct-038">
                <TestimonialSwiperCard
                  shortTestimonial={item?.shortTestimonial}
                  clientName={item?.authorName}
                  designation={item?.authorCompany}
                  companyLogo={item?.companyLogo?.url}
                  authorAvatar={item?.author_avatar?.url}
                  linkUrl={item?.extrernalLink}
                  featured={item?.featured}
                  slug={item?.slug}
                  linkonButton={false}
                />
              </SwiperSlide>
            ))}
            <div className="flex gap-space-04 justify-start mt-space-25 z-50">
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
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LandingPageTestimonial;
