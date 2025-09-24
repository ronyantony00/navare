import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface PlanCardSkeletonProps {
  showPlanType?: boolean;
  showPlanTier?: boolean;
  showPlanBadge?: boolean;
  showPlanTypeName?: boolean;
  showDescription?: boolean;
  showFeatures?: boolean;
  featuresCount?: number;
  showButton?: boolean;
  showPlanImage?: boolean;
  className?: string;
}

const PlanCardSkeleton = ({
  showPlanType = true,
  showPlanTier = true,
  showPlanBadge = true,
  showPlanTypeName = true,
  showDescription = true,
  showFeatures = true,
  featuresCount = 4,
  showButton = true,
  showPlanImage = true,
  className = '',
}: PlanCardSkeletonProps) => {
  return (
    <div className={`w-full xl:p-space-25 h-full p-space-10 rounded-sm flex md:flex-row flex-col gap-space-40 ${className}`}>
      <div className="flex w-full flex-col gap-space-10">
        <div className="flex w-full flex-col gap-space-05 pb-space-10">
          <div className="flex 2xs:flex-row flex-col-reverse justify-between min-h-space-60 w-full md:gap-space-00 gap-space-05">
            <div className="text-size-6xs text-desc-text flex flex-col gap-space-03 md:self-center">
              {showPlanType && <Skeleton height={16} />}
              {showPlanTypeName && showPlanTier && <Skeleton width={80} height={18} />}
            </div>
            {showPlanBadge && <Skeleton height={22} className="py-space-04 px-space-08 rounded-xl" />}
          </div>
          {showDescription && <Skeleton height={16} className="mb-space-02" />}
        </div>
        <div className="flex flex-col gap-space-09">
          {showFeatures && Array.from({ length: featuresCount }).map((_, idx) => (
            <div key={idx} className="flex gap-space-09 items-center">
              <Skeleton width={28} height={28} circle />
              <Skeleton width={120} height={16} />
            </div>
          ))}
        </div>
        {showButton && <Skeleton height={40} className="mt-auto rounded" />}
      </div>
      {showPlanImage && (
        <div className="lg:block hidden size-full">
          <Skeleton height={500} className="h-full w-full" />
        </div>
      )}
    </div>
  );
};

export default PlanCardSkeleton;
