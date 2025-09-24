'use client';
import type { Testimonial } from '@/types/apiTypes';
import React, { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/atoms/CustomButton/Button';
import VideoComponent from '@/components/atoms/VideoComponent/VideoComponent';
import { formatDateToLongString } from '@/utils/textUtils';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

interface TestimonialVideoSectionProps {
  videoUrl?: string;
  testimonialData?: Testimonial[];
}

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 pt-[140px] px-space-10">
      <div className="relative lg:w-[60%] w-full max-w-4xl max-h-[600px] bg-black rounded-lg overflow-hidden">
        {/* Video Container */}
        <div className="relative w-full h-full bg-black">
          <video
            src={videoUrl}
            className="w-full h-full object-contain"
            controls
            autoPlay
          >
            <track kind="captions" />
          </video>
        </div>

        {/* Close Button - Floating in top-right corner */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-xs font-bold bg-opacity-50 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const TestimonialVideoSection = ({ testimonialData }: TestimonialVideoSectionProps) => {
  const [selectedVideo, setSelectedVideo] = useState<{
    videoUrl: string;
    author: string;
    designation: string;
  } | null>(null);

  const handleVideoClick = (videoUrl: string, author: string, designation: string) => {
    setSelectedVideo({ videoUrl, author, designation });
  };

  const handleClosePopup = () => {
    setSelectedVideo(null);
  };

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
          // centeredSlides={true}
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
          {testimonialData?.map((item, index) => (
            <SwiperSlide key={index} className="!h-full flex flex-col">
              <div className="flex flex-col gap-space-10 p-0 h-full scale-90 hover:scale-100 transition-all duration-300">
                <div
                  onClick={() => handleVideoClick(
                    (item?.thumbnailVideo?.url) || '',
                    item?.authorName || 'Unknown',
                    item?.authorTitle || 'Unknown',
                  )}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleVideoClick(
                        (item?.thumbnailVideo?.url) || '',
                        item?.authorName || 'Unknown',
                        item?.authorTitle || 'Unknown',
                      );
                    }
                  }}
                >
                  <VideoComponent
                    videoUrl={(item?.thumbnailVideo?.url) || ''}
                    author={item?.authorName}
                    designation={item?.authorTitle}
                    className="sm:h-space-125"
                  />
                </div>
                <div className="text-size-2xs text-desc-text">
                  {item?.shortTestimonial}
                </div>
                <div className="text-size-4xs text-primary flex items-start gap-space-10">
                  <div>{item?.authorName}</div>
                  <div>{formatDateToLongString(item?.publishedAt || '')}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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

      {/* Video Popup */}
      {selectedVideo && (
        <VideoPopup
          isOpen={!!selectedVideo}
          onClose={handleClosePopup}
          videoUrl={selectedVideo.videoUrl}
        />
      )}
    </div>
  );
};

export default TestimonialVideoSection;
