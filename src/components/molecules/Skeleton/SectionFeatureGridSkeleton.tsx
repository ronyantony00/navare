import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SectionFeatureGridSkeletonProps {
  count?: number;
}

const SectionFeatureGridSkeleton = ({ count = 3 }: SectionFeatureGridSkeletonProps) => {
  return (
    <div className="hidden md:grid grid-cols-3 gap-space-10 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-space-02">
          <Skeleton circle width={48} height={48} className="size-space-12" />
          <span className="font-medium w-3/4">
            <Skeleton width="80%" height={18} />
          </span>
          <span className="text-desc-text w-full">
            <Skeleton width="90%" height={14} count={2} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default SectionFeatureGridSkeleton;
