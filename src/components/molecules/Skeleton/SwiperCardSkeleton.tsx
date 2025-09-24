import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SwiperCardTabGridSkeletonProps {
  tabCount?: number;
}

const SwiperCardTabGridSkeleton = ({ tabCount = 5 }: SwiperCardTabGridSkeletonProps) => {
  const placeholders = Array.from({ length: tabCount });

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-space-10 w-full">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="w-full p-space-08 rounded-sm border border-small-text"
        >
          <div className="flex items-start gap-space-06">
            <div className="flex flex-col items-center justify-center gap-space-10">
              {/* Icon skeleton */}
              <Skeleton circle width={30} height={30} />
              <div className="flex flex-col items-center gap-space-04">
                {/* Title skeleton */}
                <Skeleton width={60} height={12} />
                {/* Description skeleton */}
                <Skeleton width={80} height={10} />
              </div>
            </div>
          </div>
          <div className="mt-space-06 h-space-02 bg-gray-200 rounded-full overflow-hidden">
            {/* Progress bar skeleton */}
            <Skeleton height="100%" width="100%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwiperCardTabGridSkeleton;
