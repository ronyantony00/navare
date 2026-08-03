import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/atoms/CustomButton/Button';
import TestimonialSwiperCard from '@/components/atoms/TestimonialSwiperCard/TestimonialSwiperCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface Testimonial {
  id: number;
  title: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  rating: number;
  content: BlocksContent;
  shortTestimonial?: string;
  companyLogo: {
    url: string;
  } | null;
}

const TestimonialSwiper = ({ testimonialData }: { testimonialData: Testimonial[] }) => {
  console.warn('testimonialData', testimonialData);
  return (
    <div className="max-w-maxwidth mx-auto section-padding-x section-padding-y relative">
      <span className="w-space-75 h-space-75 bg-secondary-blur blur-[100px] opacity-80 absolute top-space-150 right-space-00"></span>
      <div>
        <TextCombo
          title="What People Say"
          spanText="About Us"
          description="Fantastic service! My family and I moved into a new house, and the team did an impeccable job. They not only helped with the move but also offered packing materials, which was very helpful. "
          className="text-center mb-space-10 mb-space-08 xl:mb-space-24"
          titleClass="section-title"
          descClass="primary-content max-w-pct-090 sm:max-w-pct-070 2md:max-w-pct-050 mx-auto"
        />
      </div>
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
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {testimonialData?.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <TestimonialSwiperCard
              description={item?.content}
              clientName={item?.authorName}
              authorTitle={item?.authorTitle}
              designation={item?.authorCompany}
              imageUrl={item?.companyLogo?.url}
              shortTestimonial="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
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
          />
          <Button
            variant="rounded"
            text=""
            arrow
            arrowDirection="right"
            mainClass="swiper-next-btn"
          />
        </div>
      </Swiper>
    </div>
  );
};

export default TestimonialSwiper;
