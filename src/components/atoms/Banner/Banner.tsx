import React from 'react';

interface ParallelogramBannerProps {
  planType?: string;
  text?: string;
  className?: string;
  textClassName?: string;
}

const Banner: React.FC<ParallelogramBannerProps> = ({ text, className, textClassName, planType }) => {
  const backgroundClass = text === 'PLUS' ? 'bg-blue-banner' : 'bg-plan-card-tier';
  return (
    <div className="flex sm:items-center 2xs:gap-space-08 gap-space-02 sm:flex-row flex-col">
      <div className="text-size-xl text-plan-card-name font-bold">
        {planType}
      </div>
      {text
        && (
          <div className={`${backgroundClass} transform skew-x-banner-degree-neg size-fit px-space-05 ${className}`}>
            <div className={`transform skew-x-banner-degree text-white text-size-3xs tracking-widest text-center select-none ${textClassName}`}>
              {text}
            </div>
          </div>
        )}
    </div>
  );
};

export default Banner;
