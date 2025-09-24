import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface TextComboSkeletonProps {
  className?: string;
  showBanner?: boolean;
  showSmallText?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showButtons?: boolean;
}

const TextComboSkeleton = ({
  className = '',
  showBanner = true,
  showSmallText = true,
  showTitle = true,
  showDescription = true,
  showButtons = true,
}: TextComboSkeletonProps) => {
  return (
    <div className={`flex flex-col gap-space-08 rounded-md ${className}`} data-testid="text-combo-skeleton">
      {showBanner && (
        <div className="mb-2 w-pct-030">
          {/* bannerText */}
          <Skeleton height={45} borderRadius={50} className="bg-gray-200" highlightColor="#e0e0e0" />
        </div>
      )}
      {showSmallText && (
        <div className="mb-2 w-pct-020">
          {/* smallText */}
          <Skeleton height={45} borderRadius={50} />
        </div>
      )}
      {showTitle && (
        <div className="mb-3 w-pct-070">
          {/* title + spanText + extraTitle */}
          <Skeleton height={45} borderRadius={50} />
          <Skeleton height={45} width="80%" className="ml-pct-010" borderRadius={50} />
        </div>
      )}
      {showDescription && (
        <div className="mb-4 w-pct-080">
          {/* description */}
          <Skeleton height={45} borderRadius={50} />
        </div>
      )}
      {showButtons && (
        <div className="flex flex-wrap gap-space-04 items-center justify-center">
          {/* buttonOne */}
          <Skeleton height={60} width={120} borderRadius={50} />
          {/* buttonTwo */}
          <Skeleton height={60} width={140} borderRadius={50} />
        </div>
      )}
    </div>
  );
};

export default TextComboSkeleton;
