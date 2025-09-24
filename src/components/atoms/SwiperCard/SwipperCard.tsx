'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AUTO_ADVANCE_TIME } from '@/constants/dataConstants/featureCardConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface FeatureTabsProps {
  featureData: any[];
}

const FeatureTabs = ({ featureData }: FeatureTabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const tabs = featureData;

  useEffect(() => {
    if (isPaused || tabs.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const next = (current + 1) % tabs.length;
        return next;
      });
    }, AUTO_ADVANCE_TIME);

    return () => clearInterval(interval);
  }, [isPaused, tabs.length]);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  return (
    <div className="w-full mx-auto ">
      <div className="flex flex-col gap-space-20 lg:gap-space-40">
        {/* Tab Content - Image Display */}
        <div className="w-full px-space-02 pb-space-02 pt-space-02 sm:pt-space-03 sm:px-space-12 sm:pb-space-11 feature-image-card-bg rounded-md-2 flex flex-col">
          <div className="relative overflow-hidden rounded-md-2 aspect-video">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`absolute inset-0 transition-opacity duration-300 border border-primary ${index === activeTab ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={getImageUrl(tab.feature_image?.url)}
                  alt={tab.feature_title}
                  width={700}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* <div className="h-space-15 2xs:h-space-25 sm:h-space-35 rounded-md-3 border border-border-color bg-container-gradient w-full mt-space-06"></div> */}
        </div>

        <div
          className={`grid xl:grid-cols-${tabs.length} sm:grid-cols-2 grid-cols-1 gap-space-10`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {tabs.map((tab, index) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={`w-full cursor-pointer px-space-05 pt-space-12 pb-space-24 rounded-md-3 flex flex-col ${index === activeTab ? 'plan-card-bg border border-primary' : 'relative overflow-hidden'} justify-between gap-space-10 transition-all duration-200 text-left hover:shadow-md`}
            >
              <span className="absolute bg-primary-blur rounded-full opacity-60 blur-3xl w-space-50 h-space-50 bottom-0 right-0"></span>
              <div className="flex justify-center gap-space-06">
                <div className="flex flex-col items-center justify-center gap-space-10">
                  <div className="size-space-15 flex items-center justify-center">
                    <Image
                      src={getImageUrl(tab.icon?.url) || ''}
                      alt={tab.feature_title}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-space-04">
                    <div className="text-size-2xs font-medium text-subtle-desc">{tab.feature_title}</div>
                    <div className="text-size-3xs text-center text-desc-text">{tab.description}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureTabs;
