'use client';

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LandingPageSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#071712" highlightColor="#122518" borderRadius="999px">
      <div className="w-full flex flex-col items-center justify-center section-padding-x ">
        {/* Hero Section */}
        <div className="relative landing-hero-bg w-full flex flex-col items-center justify-center bg-red-500">
          <div className="w-full max-w-maxwidth px-4 py-16 md:py-24">
            <div className="flex flex-col items-start gap-6">
              {/* Hero Title */}
              <div className="w-full max-w-4xl">
                <Skeleton height={60} className="mb-3" />
                <Skeleton height={60} width="80%" className="mx-auto" />
              </div>
              {/* Hero Description */}
              <div className="w-full max-w-2xl">
                <Skeleton height={24} count={2} className="mb-2" />
              </div>
              {/* Hero Button */}
              <div className="flex gap-4 items-center">
                <Skeleton height={30} width={150} borderRadius={25} />
                <Skeleton height={20} width={100} />
              </div>
              {/* Key Value */}
              <div className="mt-2">
                <Skeleton height={50} width={200} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full flex flex-col items-center justify-center bg-landing-hero-bg-color">

          {/* Service Section */}
          <div className="relative w-full flex flex-col items-center justify-center overflow-hidden py-16">
            <div className="w-full max-w-maxwidth px-4 ">
              {/* Tag */}
              <div className="flex justify-start mb-4">
                <Skeleton height={30} width={120} borderRadius={15} />
              </div>
              {/* Title */}
              <div className="flex justify-start mb-12">
                <div className="w-full max-w-2xl">
                  <Skeleton height={48} className="mb-2" />
                  <Skeleton height={48} width="70%" className="mx-auto" />
                </div>
              </div>
              {/* Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(item => (
                  <div key={item} className="p-6 rounded-lg">
                    <Skeleton height={48} width={48} className="mb-4" borderRadius={8} />
                    <Skeleton height={32} width="80%" className="mb-3" />
                    <Skeleton height={20} count={3} className="mb-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SeaCargo/Why Us Section */}
          <div className="w-full max-w-maxwidth flex flex-col items-end justify-center px-4 py-16">
            {/* Title */}
            <div className="w-full max-w-xl  self-end mb-12">
              <Skeleton height={48} className="mb-2" />
              <Skeleton height={48} width="80%" className="mx-auto" />
            </div>
            {/* Images and Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-8 ">
              {/* Images Column */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex-col gap-4">
                  <Skeleton height={300} borderRadius={20} />
                  <Skeleton height={150} borderRadius={20} />
                </div>
                <div className="flex-col gap-4">
                  <Skeleton height={150} borderRadius={20} />
                  <Skeleton height={300} borderRadius={20} />
                </div>
              </div>
              {/* Features Column */}
              <div className="space-y-6">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="flex gap-4">
                    <Skeleton height={40} width={40} borderRadius={8} />
                    <div className="flex-1">
                      <Skeleton height={24} width="70%" className="mb-2" />
                      <Skeleton height={16} count={2} />
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-start">
                  <Skeleton height={50} width={150} borderRadius={10} />
                  <Skeleton height={50} width={50} borderRadius={100} />
                  <Skeleton height={50} width={180} borderRadius={10} />
                </div>
              </div>
            </div>
            {/* Contact Info */}
          </div>

          {/* Ecosystem Section */}
          <div className="bg-[image:var(--bg-technology-section-bg)] bg-no-repeat bg-center bg-cover w-full py-16">
            <div className="w-full max-w-maxwidth px-4 mx-auto">
              {/* Title and Description */}
              <div className="w-full max-w-3xl mx-auto text-center mb-12">
                <Skeleton height={48} className="mb-4" />
                <Skeleton height={48} width="80%" className="mx-auto mb-6" />
                <Skeleton height={20} count={2} className="mb-2" />
              </div>
              {/* Client Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
                  <div key={item} className="flex items-center justify-center">
                    <Skeleton height={60} width={120} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stories/News Section */}
          <div className="relative flex flex-col items-center bg-no-repeat bg-top w-full py-16">
            <div className="w-full max-w-maxwidth px-4">
              {/* Tag */}
              <div className="flex justify-center mb-4">
                <Skeleton height={30} width={120} borderRadius={15} />
              </div>
              {/* Title */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-2xl text-center">
                  <Skeleton height={48} className="mb-2" />
                  <Skeleton height={48} width="70%" className="mx-auto" />
                </div>
              </div>
              {/* News Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(item => (
                  <div key={item} className="rounded-lg overflow-hidden">
                    <Skeleton height={200} className="mb-4" borderRadius={20} />
                    <Skeleton height={24} width="90%" className="mb-2" />
                    <Skeleton height={16} count={3} className="mb-3" />
                    <Skeleton height={20} width={100} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="w-full flex flex-col items-center justify-center overflow-hidden py-16">
            <div className="w-full max-w-maxwidth px-4">
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
              {/* Testimonial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(item => (
                  <div key={item} className="p-6 rounded-lg">
                    <Skeleton height={16} count={4} className="mb-4" />
                    <div className="flex items-center gap-4">
                      <Skeleton circle={true} height={50} width={50} />
                      <div className="flex-1">
                        <Skeleton height={20} width="60%" className="mb-2" />
                        <Skeleton height={16} width="80%" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Impact Section */}
          <div className="w-full flex flex-col items-center justify-center overflow-hidden py-16">
            <div className="w-full max-w-maxwidth px-4">
              {/* Tag */}
              <div className="flex justify-center mb-4">
                <Skeleton height={30} width={120} borderRadius={15} />
              </div>
              {/* Title */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-2xl text-center">
                  <Skeleton height={48} className="mb-2" />
                  <Skeleton height={48} width="70%" className="mx-auto" />
                </div>
              </div>
              {/* Impact Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="text-center p-6">
                    <Skeleton height={60} width="80%" className="mx-auto mb-3" />
                    <Skeleton height={24} width="90%" className="mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="w-full flex flex-col items-center justify-center overflow-hidden py-16">
            <div className="w-full max-w-maxwidth px-4">
              <div className="text-center">
                {/* Title */}
                <div className="flex justify-center mb-6">
                  <div className="w-full max-w-2xl">
                    <Skeleton height={48} className="mb-2" />
                    <Skeleton height={48} width="70%" className="mx-auto" />
                  </div>
                </div>
                {/* Description */}
                <div className="flex justify-center mb-8">
                  <div className="w-full max-w-xl">
                    <Skeleton height={20} count={2} />
                  </div>
                </div>
                {/* CTA Button */}
                <div className="flex justify-center">
                  <Skeleton height={50} width={180} borderRadius={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LandingPageSkeleton;
