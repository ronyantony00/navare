import Image from 'next/image';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface ImpactCardProps {
  metric_value: string | number;
  metric_title: string;
  description: string;
  isUp: boolean;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ metric_value, metric_title, description, isUp }) => {
  return (
    <div className="flex flex-col items-center text-center gap-space-05">
      <div className="md:flex flex-col items-center text-center gap-space-05 hidden">
        {isUp
          && (
            <div className="flex flex-col items-center xl:pt-space-50">
              <div className="relative z-20 flex w-full size-space-60 items-center justify-center text-primary border-1 border-border-color text-size-2xl aspect-square font-medium rounded-md stories-card-bg p-space-05">
                {metric_value}
              </div>
              <Image src={ImageConstants.ImpactIconDown} alt="impact up" width={130} height={130} />
            </div>
          )}
        <div className="max-w-pct-090 items-center flex flex-col gap-space-05">
          <div className="text-white text-size-2xs">
            {metric_title}
          </div>
          <div className="text-desc-text text-size-3xs">
            {description}
          </div>
        </div>
        {!isUp && (
          <div className="flex flex-col items-center">
            <Image src={ImageConstants.ImpactIconUp} alt="impact down" width={130} height={130} />
            <div className="relative z-20 flex w-full size-space-60 items-center justify-center text-primary border-1 border-border-color text-size-2xl aspect-square font-medium rounded-md stories-card-bg p-space-05">
              {metric_value}
            </div>
          </div>
        )}
      </div>
      <div className="md:hidden flex flex-col items-center text-center gap-space-05">
        <div className="relative z-20 flex size-space-60 items-center justify-center text-primary border-1 border-border-color md:text-size-2xl text-size-xl aspect-square rounded-md stories-card-bg p-space-05">
          {metric_value}
        </div>
        <Image src={ImageConstants.ImpactIconDown} alt="impact down" width={130} height={130} />
        <div className="max-w-pct-090 items-center flex flex-col gap-space-05">
          <div className="text-white text-size-2xs">
            {metric_title}
          </div>
          <div className="text-desc-text text-size-3xs">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCard;
