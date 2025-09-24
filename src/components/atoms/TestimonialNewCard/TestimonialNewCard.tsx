'use client';

import type { Testimonial } from '@/types/commonTypes';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/atoms/CustomButton/Button';
import TestimonialText from '@/components/atoms/TestimonialText/TestimonialText';
import TextCombo from '../TextCombo/TextCombo';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialNewCardProps {
  testimonialData: Testimonial[];
  titlePrefix?: string;
  titleHighlight?: string;
}

const TestimonialNewCard = ({ testimonialData, titlePrefix, titleHighlight }: TestimonialNewCardProps) => {
  return (
    <div className="flex flex-col gap-space-08 items-center justify-center md:px-space-35 px-space-05">
      <div className="size-full flex flex-col gap-space-08 md:py-space-40 py-space-20 px-space-10 items-center justify-center rounded-lg bg-[image:var(--bg-solution-testimonial-new-bg)] bg-cover bg-center border border-border-color overflow-hidden">
        {/* Content above video */}
        <div className="z-10 w-full flex flex-col items-center justify-center min-h-[350px]">
          <TextCombo
            spanClass="text-primary"
            title={titlePrefix}
            spanText={titleHighlight}
            titleClass="sub-heading"
            textClass="text-center"
          />
          <div className="w-full flex flex-row items-center justify-center">
            {testimonialData?.length > 0
              ? (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                    navigation={{ prevEl: '.swiper-prev-btn', nextEl: '.swiper-next-btn' }}
                    centeredSlides={true}
                    loop={true}
                    className="testimonial-swiper relative"
                    breakpoints={{
                      768: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {testimonialData?.map((item, index) => (
                      <SwiperSlide key={index} className="!h-auto ">
                        <div className="flex flex-col items-center justify-center gap-space-10">
                          <div className="max-w-pct-080">
                            <div className="text-center">
                              {item?.shortTestimonial && (
                                <TestimonialText
                                  text={item.shortTestimonial}
                                  maxLines={6}
                                  className="text-center text-desc-text"
                                />
                              )}
                            </div>
                          </div>
                          <div className="text-size-2xs text-white">{item?.authorName}</div>
                        </div>
                      </SwiperSlide>
                    ))}
                    <div className="items-center flex pt-space-10 gap-space-07 justify-center">
                      <Button
                        variant="testimonial"
                        text=""
                        arrow
                        arrowDirection="left"
                        mainClass="swiper-prev-btn"
                        arrowClassName="size-space-10"
                      />
                      <Button
                        variant="testimonial"
                        text=""
                        arrow
                        arrowDirection="right"
                        mainClass="swiper-next-btn"
                        arrowClassName="size-space-10"
                      />
                    </div>
                  </Swiper>
                )
              : (
                  <div className="flex flex-col items-center justify-center gap-space-10">
                    <div className="text-center text-size-2xs text-white">No testimonials found</div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialNewCard;
