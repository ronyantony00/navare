import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageGridSkeleton = () => {
  return (
    <SkeletonTheme>
      <div className="p-4 w-full">
        <div className="grid grid-cols-3 gap-4 w-full mx-auto">
          {/* Row 1 */}
          <div className="rounded-lg p-6  ">
            <Skeleton height={40} width="70%" className="mb-2" />
          </div>
          {/* Row 2 */}
          <div className="col-span-2  rounded-lg p-6  ">
            <Skeleton height={50} width="60%" className="mb-3" />
          </div>
          {/* Row 3 */}
          <div className="col-span-2  rounded-lg p-6  ">
            <Skeleton height={45} width="65%" className="mb-2" />
          </div>
          {/* Row 4 */}
          <div className="  rounded-lg p-6  ">
            <Skeleton height={48} width="55%" className="mb-3" />
          </div>
          {/* Row 5 */}
          <div className="  rounded-lg p-6  ">
            <Skeleton height={48} width="55%" className="mb-3" />
          </div>
          {/* Row 6 */}
          <div className="col-span-2  rounded-lg p-6  ">
            <Skeleton height={48} width="55%" className="mb-3" />
          </div>
          {/* Row 7 */}
          <div className="col-span-2  rounded-lg p-6  ">
            <Skeleton height={48} width="55%" className="mb-3" />
          </div>
          {/* Row 8 */}
          <div className="  rounded-lg p-6  ">
            <Skeleton height={48} width="55%" className="mb-3" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ImageGridSkeleton;
