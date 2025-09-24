import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface FeatureCardSkeletonProps {
  count?: number;
  className?: string;
}

const FeatureCardSkeleton = ({ count = 2, className }: FeatureCardSkeletonProps) => {
  return (
    <div className={`col-span-2 grid md:grid-cols-2 grid-cols-1 gap-space-10 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col p-space-08 rounded-md gap-space-04 feature-card-hover">
          <div className="flex items-center justify-center mb-space-04">
            <Skeleton circle width={48} height={48} />
          </div>
          <div className="mb-space-02">
            {/* smallTitle */}
            <Skeleton width={80} height={14} />
          </div>
          <div className="mb-space-02">
            {/* title */}
            <Skeleton width={120} height={20} />
          </div>
          <div className="mb-space-04">
            {/* description */}
            <Skeleton count={2} width={180} height={12} />
          </div>
          <div className="flex justify-center">
            {/* button */}
            <Skeleton width={100} height={32} borderRadius={16} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCardSkeleton;
