import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FaqSkelton = () => {
  return (
    <SkeletonTheme baseColor="" highlightColor="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array.from({ length: 2 })].map((_, colIndex) => (
          <div key={`skeleton-col-${colIndex}`} className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${colIndex}-${index}`} className="rounded-lg p-6 border">
                <Skeleton height={24} className="mb-4" />
                <Skeleton height={16} count={2} className="mb-2" />
                <Skeleton height={16} width="75%" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default FaqSkelton;
