'use client';

import type { Testimonial, TestimonialSectionProps } from '@/types/commonTypes';
import { useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import TestimonialNewCard from '@/components/atoms/TestimonialNewCard/TestimonialNewCard';
import TestimonialSwiperCard from '@/components/atoms/TestimonialSwiperCard/TestimonialSwiperCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { getTestimonialsDataClientPaginated } from '@/services/apiService';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import TestimonialVideoSection from '../TestimonialVideoSection/TestimonialVideoSection';

const TestimonialSection = ({ testimonialData, borderColor = 'border-border-color', variant, footerTitle, footerSpanText, footerDescription, buttonOneText, titleHighlight, titlePrefix, footerExtraTitle, paginationMeta, videoTestimonialsData, footerMedia }: TestimonialSectionProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialData ?? []);
  const [currentPage, setCurrentPage] = useState<number>(paginationMeta?.page ?? 1);
  const [isLoading, setIsLoading] = useState(false);

  const col1: Testimonial[] = [];
  const col2: Testimonial[] = [];
  const col3: Testimonial[] = [];
  testimonials?.forEach((item, idx) => {
    if (idx % 3 === 0) {
      col1.push(item);
    } else if (idx % 3 === 1) {
      col2.push(item);
    } else {
      col3.push(item);
    }
  });

  const styles = [
    '-bottom-space-03 -left-space-03',
    '-bottom-space-03 -right-space-03',
  ];

  const serverTotalPages = paginationMeta?.pageCount;
  const totalPages = serverTotalPages ?? Math.ceil((testimonials?.length ?? 0) / 9);
  const hasMoreTestimonials = currentPage < totalPages;

  const handleLoadMore = async () => {
    if (isLoading || !hasMoreTestimonials) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await getTestimonialsDataClientPaginated(nextPage, 9);

      // Append new testimonials to the existing list
      setTestimonials(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full relative border flex flex-col items-center justify-center gap-space-30 border-b ${borderColor}`}>
      <div className="w-full max-w-maxwidth mx-auto section-padding-x">
        <div className="relative w-full">
          {variant === 'solution'
            ? (
                <div className={`relative mx-auto max-w-maxwidth border-x ${borderColor} section-padding-y`}>
                  {styles.map((style, index) => (
                    <div key={index} className={`w-space-05 h-space-05 rotate-45 border-primary z-10 border absolute ${style} bg-navare-green`}></div>
                  ))}
                  <TestimonialNewCard testimonialData={testimonialData ?? []} titlePrefix={titlePrefix} titleHighlight={titleHighlight} />
                </div>
              )
            : (
                <div className="relative mx-auto max-w-maxwidth flex flex-col items-center justify-center w-full">
                  <TestimonialVideoSection testimonialData={videoTestimonialsData} />
                  <div className="relative max-w-maxwidth w-full flex flex-col items-center justify-center">
                    <span className="absolute -left-space-50 top-space-200 w-space-200 h-space-200 bg-blue-circle-bg blur-[130px] rounded-full opacity-80"></span>
                    <span className="absolute right-space-10 top-space-150 w-space-300 h-space-250 bg-primary-blur blur-[100px] rounded-full opacity-60"></span>
                    <div className="md:py-space-30 py-space-20 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-space-16">
                      <div className="flex flex-col gap-space-16">
                        {col1.map((item, index) => (
                          <div key={index} className="h-auto">
                            <TestimonialSwiperCard
                              description={item?.shortTestimonial}
                              clientName={item?.authorName}
                              designation={item?.authorCompany}
                              imageUrl={item?.author_avatar?.url}
                              companyLogo={item?.companyLogo?.url}
                              authorAvatar={item?.author_avatar?.url}
                              rating={item?.rating}
                              showRating={true}
                              featured={item?.featured}
                              linkUrl={item?.extrernalLink}
                              slug={item?.slug}
                              linkonButton={false}
                              shortTestimonial={item?.shortTestimonial}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-space-16 xl:pt-space-30">
                        {col2.map((item, index) => (
                          <div key={index} className="h-auto">
                            <TestimonialSwiperCard
                              description={item?.content}
                              clientName={item?.authorName}
                              designation={item?.authorCompany}
                              companyLogo={item?.companyLogo?.url}
                              authorAvatar={item?.author_avatar?.url}
                              rating={item?.rating}
                              showRating={true}
                              linkUrl={item?.extrernalLink}
                              slug={item?.slug}
                              featured={item?.featured}
                              linkonButton={false}
                              shortTestimonial={item?.shortTestimonial}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="xl:flex xl:flex-col xl:col-span-1 md:col-span-2 md:grid md:grid-cols-2 flex flex-col gap-space-16">
                        {col3.map((item, index) => (
                          <div key={index} className="h-auto">
                            <TestimonialSwiperCard
                              description={item?.content}
                              clientName={item?.authorName}
                              designation={item?.authorCompany}
                              companyLogo={item?.companyLogo?.url}
                              authorAvatar={item?.author_avatar?.url}
                              rating={item?.rating}
                              showRating={true}
                              linkUrl={item?.extrernalLink}
                              slug={item?.slug}
                              featured={item?.featured}
                              linkonButton={false}
                              shortTestimonial={item?.shortTestimonial}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {hasMoreTestimonials && (
                      <div className="w-full flex justify-center mt-space-15">
                        <Button
                          variant="primary"
                          text={isLoading ? 'Loading...' : 'View More'}
                          onClick={handleLoadMore}
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full max-w-maxwidth flex flex-col h-full items-center justify-center lg:py-space-30 py-space-20 ">
                    <div className="w-full  flex flex-col h-full items-center justify-center p-space-01 rounded-lg gradient-border-corners-footer overflow-hidden">
                      <div className="relative flex w-full h-full rounded-lg overflow-hidden bg-blend-overlay">
                        {/* Video as background */}
                        <video
                          src={getImageUrl(footerMedia?.url) || '/assets/videos/testimonial-footer-image.mp4'}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute top-0 left-0 w-full h-full object-cover z-10 rounded-lg"
                        />
                        {/* Overlay */}
                        <div className="absolute top-0 left-0 w-pct-060 h-full  z-20 pointer-events-none" />
                        {/* Content */}
                        <div className="relative lg:max-w-pct-060 lg:p-space-40 sm:p-space-20 p-space-05 z-30 overflow-hidden">
                          <div className="absolute z-10 top-0 left-0 w-full h-full testimonial-footer-bg bg-cover bg-center bg-no-repeat opacity-90"></div>
                          <TextCombo
                            title={footerTitle}
                            spanText={footerSpanText}
                            extraTitle={footerExtraTitle}
                            description={footerDescription}
                            buttonOneText={buttonOneText || 'Book a Demo'}
                            buttonOneLink="/schedule-demo"
                            className="flex flex-col sm:p-space-20 p-space-05 relative z-30 lg:max-w-pct-090 sm:max-w-pct-080"
                            titleClass="sub-heading font-bold"
                            descClass="text-desc-text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
