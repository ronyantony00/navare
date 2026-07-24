'use client';

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface MediaContainerSkeletonProps {
  className?: string;
  borderRadius?: number | string;
}

/** Dark-theme pulse skeleton for media containers (Rive / video). */
const MediaContainerSkeleton = ({ className = '', borderRadius = 12 }: MediaContainerSkeletonProps) => {
  return (
    <div
      className={`absolute inset-0 z-10 overflow-hidden ${className}`}
      aria-busy="true"
      aria-label="Loading"
      role="status"
    >
      <SkeletonTheme baseColor="#0a1a14" highlightColor="#153429" borderRadius={borderRadius}>
        <Skeleton width="100%" height="100%" borderRadius={borderRadius} containerClassName="block h-full w-full leading-none" />
      </SkeletonTheme>
    </div>
  );
};

export default MediaContainerSkeleton;
