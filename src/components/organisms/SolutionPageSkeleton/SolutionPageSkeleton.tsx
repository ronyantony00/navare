import React from 'react';
import FeatureCardSkeleton from '@/components/molecules/Skeleton/FeatureCardSkeleton';
import ImageGridSkeleton from '@/components/molecules/Skeleton/ImageGridSkeleton';
import ImageSkeleton from '@/components/molecules/Skeleton/imageSkeleton';
import PlanCardSkeleton from '@/components/molecules/Skeleton/PlanCardSkeleton';
import SectionFeatureGridSkeleton from '@/components/molecules/Skeleton/SectionFeatureGridSkeleton';
import SwiperCardTabGridSkeleton from '@/components/molecules/Skeleton/SwiperCardSkeleton';
import TestimonialCardSkeleton from '@/components/molecules/Skeleton/TestimonialCardSkeleton';
import TextComboSkeleton from '@/components/molecules/Skeleton/TextComboSkeleton';

const SolutionPageSkeleton = () => {
  return (
    <div className="bg-breadcrumb-nav-bg w-full flex flex-col gap-space-20 px-space-15 md:px-space-40 md:py-space-30 py-space-20 min-h-screen items-center">
      <TextComboSkeleton className="w-full items-center" />
      <ImageSkeleton className="w-full items-center" />
      <TextComboSkeleton className="w-full items-center" showSmallText={false} showBanner={false} showButtons={false} />
      <ImageSkeleton className="w-full items-center" />
      <SwiperCardTabGridSkeleton tabCount={5} />
      <TextComboSkeleton className="w-full items-center" showSmallText={false} showBanner={false} showButtons={false} />
      <ImageSkeleton className="w-full items-center" />
      <TextComboSkeleton className="w-full items-center" showDescription={false} showSmallText={false} showBanner={false} showButtons={false} />
      <SectionFeatureGridSkeleton count={3} />
      <TextComboSkeleton className="w-full items-start" showDescription={false} showSmallText={false} showBanner={false} showButtons={false} />
      <div className="w-full flex gap-space-10">
        <ImageSkeleton className="w-full items-center flex-1" />
        <FeatureCardSkeleton count={4} className="flex-1" />
      </div>
      <TextComboSkeleton className="w-full items-start" showSmallText={false} showBanner={false} showButtons={false} />
      <ImageSkeleton className="w-full items-center" />
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-space-10">
        <TextComboSkeleton className="w-full items-start" showSmallText={false} showButtons={false} />
        <ImageGridSkeleton />
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-space-10">
        <ImageSkeleton className="w-full items-center" />
        <TextComboSkeleton className="w-full items-start" showButtons={false} />
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-space-10">
        <TextComboSkeleton className="w-full items-start" showBanner={false} showSmallText={false} showButtons={false} />
        <ImageSkeleton className="w-full items-center" />
      </div>
      <TextComboSkeleton className="w-full items-center" showBanner={false} showSmallText={false} showButtons={false} />
      <TestimonialCardSkeleton />
      <PlanCardSkeleton className="w-full" showPlanImage={true} />
      <TextComboSkeleton className="w-full items-start" />
    </div>
  );
};

export default SolutionPageSkeleton;
