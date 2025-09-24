import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ImageSkeletonProps {
  className?: string;
}

const ImageSkeleton = ({ className = '' }: ImageSkeletonProps) => {
  return (
    <div
      className={`aspect-video max-h-video-height w-full ${className}`}
      data-testid="image-skeleton"
    >
      <Skeleton
        width="100%"
        height="100%"
        borderRadius={20}
      />
    </div>
  );
};

export default ImageSkeleton;
