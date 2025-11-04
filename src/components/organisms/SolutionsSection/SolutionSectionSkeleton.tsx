'use client';

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SolutionSectionSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#071712" highlightColor="#122518" borderRadius="999px">
      <div className="w-full flex flex-col items-center justify-center p-5">
        {/* Hero Section */}
        <div className="relative w-full flex flex-col items-center justify-center bg-landing-hero-bg-color py-16 md:py-24">
          <div className="w-full max-w-maxwidth px-4">
            <div className="flex items-center">
              {/* Hero Text */}
              <div className="flex flex-col items-center justify-center gap-6 w-full ">
                <div className="flex gap-4">
                  <Skeleton height={48} width={180} borderRadius={25} />
                </div>
                <div className="w-full max-w-2xl text-center">
                  <Skeleton height={56} width="80%" className="mb-4" />
                  <Skeleton height={56} width="70%" className="mb-4" />
                </div>
                <div className="w-full max-w-xl">
                  <Skeleton height={20} width="100%" count={2} className="mb-2" />
                </div>
                <div className="flex gap-4">
                  <Skeleton height={48} width={180} borderRadius={25} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-landing-hero-bg-color w-full flex flex-col items-center justify-center">
          {/* About Section */}
          <div className="w-full max-w-maxwidth px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Skeleton height={400} borderRadius={20} />
              </div>
              <div className="flex flex-col gap-6">
                <div className="w-full max-w-xl">
                  <Skeleton height={48} className="mb-3" />
                  <Skeleton height={48} width="80%" />
                </div>
                <div className="w-full">
                  <Skeleton height={20} count={4} className="mb-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="w-full max-w-maxwidth px-4 py-16">
            {/* Tag */}
            <div className="flex justify-center mb-4">
              <Skeleton height={30} width={120} borderRadius={15} />
            </div>
            {/* Title */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-2xl text-center">
                <Skeleton height={48} className="mb-2" />
                <Skeleton height={48} width="70%" className="mx-auto" />
              </div>
            </div>
            {/* Description */}
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-xl text-center">
                <Skeleton height={20} count={2} />
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <div className="w-full text-center">
                <Skeleton height={300} width="80%" borderRadius={20} />
              </div>
            </div>
            {/* Feature Tabs */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              {[1, 2, 3, 4, 5].map(item => (
                <Skeleton key={item} height={200} width={180} borderRadius={10} />
              ))}
            </div>
            {/* Feature Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-6 rounded-lg">
                  <Skeleton height={48} width={48} className="mb-4" borderRadius={8} />
                  <Skeleton height={28} width="80%" className="mb-3" />
                  <Skeleton height={18} count={3} className="mb-2" />
                </div>
              ))}
            </div> */}
          </div>

          {/* All-in-One Platform Section */}
          <div className="w-full max-w-maxwidth px-4 py-16">
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-3xl text-center">
                <Skeleton height={48} className="mb-2" />
                <Skeleton height={48} width="75%" className="mx-auto" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="flex gap-4 p-6">
                  <Skeleton height={56} width={56} borderRadius={12} />
                  <div className="flex-1">
                    <Skeleton height={24} width="70%" className="mb-3" />
                    <Skeleton height={18} count={2} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="w-full max-w-maxwidth px-4 py-16">
            <div className="flex flex-row w-full gap-16">
              {/* Tag */}
              <div className=" w-full">
                <div className="flex justify-start mb-4">
                  <Skeleton height={30} width={100} borderRadius={15} />
                </div>
                {/* Title */}
                <div className="flex justify-start mb-12">
                  <div className="w-full max-w-2xl text-start">
                    <Skeleton height={48} className="mb-2" />
                    <Skeleton height={48} width="65%" className="mx-auto" />
                  </div>
                </div>
                <div className="flex justify-center mb-12">
                  <div className="w-full max-w-xl text-center">
                    <Skeleton height={20} count={2} />
                  </div>
                </div>
                <div className="flex justify-start w-full mb-12">
                  <div className="w-full text-start">
                    <Skeleton height={50} width={200} borderRadius={10} />
                  </div>
                </div>
              </div>
              {/* Use Case Cards */}
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="rounded-lg overflow-hidden ">
                    <Skeleton height={24} width="85%" className="mb-2" />
                    <Skeleton height={18} count={2} />
                    <Skeleton height={250} className="mb-4" borderRadius={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Know More Section */}
          <div className="w-full max-w-maxwidth px-4 py-16">
            <div className="bg-primary-green/10 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-full max-w-2xl mb-6">
                  <Skeleton height={48} className="mb-2" />
                  <Skeleton height={48} width="70%" className="mx-auto" />
                </div>
                <div className="w-full max-w-xl mb-8">
                  <Skeleton height={20} count={2} />
                </div>
                <Skeleton height={52} width={200} borderRadius={25} />
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="w-full flex flex-col items-center justify-center py-16">
            <div className="w-full max-w-maxwidth px-4">
              {/* Title */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-2xl text-center">
                  <Skeleton height={48} className="mb-2" />
                  <Skeleton height={48} width="70%" className="mx-auto" />
                </div>
              </div>
              {/* Testimonial Cards */}
              <div className="max-w-2xl mx-auto">
                <div className="p-6 rounded-lg text-center">
                  <Skeleton height={50} className="mb-4" />
                  <Skeleton height={18} width="70%" count={2} className="mb-4" />
                  <Skeleton height={18} width="80%" count={2} className="mb-4" />
                  <div className="flex items-center gap-4 justify-center mt-4">
                    <Skeleton height={40} circle={true} width={40} className="mb-2" />
                    <Skeleton height={40} circle={true} width={40} className="mb-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Studies Section */}
          <div className="w-full max-w-maxwidth px-4 py-16">
            <div className="flex w-full gap-12 ">
              <div className="flex justify-center mb-12 w-full">
                <div className="w-full max-w-2xl text-left">
                  <Skeleton height={48} className="mb-2" />
                  <Skeleton height={48} width="60%" className="mx-auto" />
                </div>
              </div>
              <div className="w-full">
                <div className="rounded-lg overflow-hidden">
                  <Skeleton height={500} className="mb-4" borderRadius={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SolutionSectionSkeleton;
