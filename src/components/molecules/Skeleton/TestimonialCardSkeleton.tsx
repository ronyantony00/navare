import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface TestimonialCardSkeletonProps {
  showRating?: boolean;
  showLogo?: boolean;
  showClientName?: boolean;
  showDesignation?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showButton?: boolean;
  showCaseStudy?: boolean;
  className?: string;
}

const TestimonialCardSkeleton = ({
  showRating = true,
  showLogo = true,
  showClientName = true,
  showDesignation = true,
  showTitle = true,
  showDescription = true,
  showButton = true,
  showCaseStudy = true,
  className = '',
}: TestimonialCardSkeletonProps) => {
  return (
    <div
      className={`relative self-start px-space-16 py-space-15 w-full max-w-space-200 rounded-sm flex flex-col gap-space-10 overflow-hidden ${className}`}
    >
      <div>
        {showRating && (
          <div className="flex gap-space-01 mb-space-02">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} width={24} height={24} circle />
            ))}
          </div>
        )}
        {showCaseStudy && <Skeleton height={16} width={100} className="mb-space-02" />}
      </div>
      <div className="flex xl:flex-row flex-col gap-space-10">
        {showLogo && <Skeleton width={100} height={100} className="w-fit max-w-pct-040 object-contain" />}
        <div className="flex flex-col gap-space-01">
          {showClientName && <Skeleton width={80} height={16} />}
          {showDesignation && <Skeleton width={60} height={14} />}
        </div>
      </div>
      <div className="flex flex-col gap-space-08">
        {showTitle && <Skeleton width={120} height={20} />}
        {showDescription && <Skeleton count={2} height={14} className="mb-space-02" />}
        {showButton && <Skeleton width={80} height={32} className="rounded-xs-2" />}
      </div>
    </div>
  );
};

export default TestimonialCardSkeleton;
