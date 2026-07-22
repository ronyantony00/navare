'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface SeaCargoFeature {
  id: number;
  title: string;
  description: string;
}

export interface LandingPageSeaCargoProps {
  titlePrefix?: string;
  titleHighlight?: string;
  helpText?: string;
  contactNumber?: string;
  imageOneUrl?: string;
  imageTwoUrl?: string;
  imageThreeUrl?: string;
  seaCargoFeatures?: SeaCargoFeature[];
  contactIcon?: string;
  contactLink?: string;
  contactLinkText?: string;
  metricValue?: string;
  metricContext?: string;
  generalImageUrl?: string;
  generalMediaIsVideo?: boolean;
}

const LandingPageSeaCargo = ({ titlePrefix, titleHighlight, helpText, contactNumber, imageOneUrl, imageTwoUrl, imageThreeUrl, seaCargoFeatures, contactLinkText, metricValue, metricContext, generalImageUrl, generalMediaIsVideo }: LandingPageSeaCargoProps) => {
  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState<number | null>(0); // First feature starts expanded
  const handleFeatureHover = (index: number) => {
    setExpandedFeatureIndex(index);
  };

  return (
    <div className="relative w-full">
      <div className="absolute top-space-00 -left-space-50 size-space-200 bg-blue-circle-bg blur-3xl opacity-30 rounded-full" />
      {/* <div className="hidden base:block bg-primary-blur h-space-200 w-space-225 rounded-full absolute top-space-200 -right-space-30 blur-[150px] opacity-50"></div> */}
      <Image src={ImageConstants.SeaCargoBg} alt="SeaCargoBg" width={500} height={500} className="absolute md:size-space-200 size-space-100 md:-top-space-20 top-0 md:-left-space-20 -left-space-30  object-contain z-10" />
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 xl:gap-space-40 gap-space-20 section-padding-y">
        <div className="sm:px-space-15 px-space-08 xl:pl-space-40 lg:pl-space-20 md:pl-space-15 lg:pr-space-00 h-full grid md:grid-cols-2 grid-cols-1 md:gap-space-13 gap-space-10">
          <div className="flex flex-col md:gap-space-13 gap-space-10">
            <Image
              src={imageOneUrl || ImageConstants.SeaCargoThree}
              alt="SeaCargoBg"
              width={1000}
              height={1000}
              className="size-full object-cover rounded-lg row-span-3"
            />
            <div className="flex xl:flex-row flex-col justify-center sm:p-space-15 p-space-10 gap-space-05 stories-card-bg border border-border-color rounded-lg">
              <div className="sm:text-size-2md text-size-md font-bold text-white">{metricValue}</div>
              <div className="sm:text-size-sm text-size-4xs text-white">{metricContext}</div>
            </div>
          </div>
          <div className="flex flex-col md:gap-space-13 gap-space-10">
            <Image
              src={imageTwoUrl || ImageConstants.SeaCargoTwo}
              alt="SeaCargoBg"
              width={1000}
              height={1000}
              className="size-full object-cover rounded-lg row-span-1 max-h-space-100"
            />
            <Image
              src={imageThreeUrl || ImageConstants.SeaCargoOne}
              alt="SeaCargoBg"
              width={1000}
              height={1000}
              className="size-full object-cover rounded-lg md:block hidden row-span-3"
            />
          </div>
        </div>
        <div className="sm:px-space-15 px-space-08 lg:pl-space-00 md:pr-space-15 lg:pr-space-20 xl:pr-space-40 relative flex flex-col lg:gap-space-27 gap-space-12 z-20 bg-[image:var(--bg-green-circle)] bg-cover bg-no-repeat bg-center">
          <TextCombo
            // title={titlePrefix}
            spanText={titleHighlight}
            extraTitle={titlePrefix}
            textClass="lg:max-w-pct-100 sm:max-w-pct-050 max-w-pct-090"
          />
          <div className="flex flex-col gap-space-10">
            {seaCargoFeatures
              && seaCargoFeatures.map((feature: SeaCargoFeature, idx: number) => (
                <button
                  type="button"
                  key={idx}
                  className="relative border border-border-color z-20 flex flex-col items-start justify-between navare-green-gradient rounded-lg p-space-10 gap-space-05 cursor-pointer hover:bg-opacity-80 transition-all duration-200 text-left"
                  onMouseEnter={() => handleFeatureHover(idx)}
                  aria-expanded={expandedFeatureIndex === idx}
                  aria-controls={`feature-description-${idx}`}
                >
                  <div className="sm:text-size-xs text-size-4xs font-medium font-comme flex gap-space-05 text-desc-text">
                    <div className="">
                      {idx + 1}
                      .
                    </div>
                    <div className="flex flex-col gap-space-03">
                      {feature.title}
                      {expandedFeatureIndex === idx && (
                        <div
                          id={`feature-description-${idx}`}
                          className="sm:text-size-3xs text-size-4xs font-normal font-satoshi flex text-desc-text"
                        >
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div className="flex flex-row flex-wrap lg:gap-space-28 pt-space-10 gap-space-10 2xs:gap-space-30">
            <Button variant="primary" arrow={true} link="/solutions/navone" text={contactLinkText} mainClass="w-fit gap-space-05" arrowClassName="size-space-05" />
            <a href={`tel:${contactNumber}`} className="flex items-center gap-space-10 cursor-pointer">
              <Image
                src={ImageConstants.PhoneIcon}
                alt="phone icon"
                width={50}
                height={50}
              />
              <div className="flex flex-col">
                <div className="text-size-4xs text-primary">
                  {helpText}
                </div>
                <div className="text-size-4xs text-primary">
                  {contactNumber}
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="relative w-full max-h-[700px] lg:col-span-2 col-span-1 section-padding-x">
          <div className="absolute z-10 top-space-00 -left-space-100 size-space-200 bg-blue-circle-bg blur-3xl opacity-30 rounded-full" />
          {/* <div className="absolute z-10 bottom-space-00 -right-space-100 size-space-200 bg-secondary-blur blur-3xl opacity-30 rounded-full" /> */}
          {generalMediaIsVideo ? (
            <video
              src={generalImageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover relative z-20 rounded-xl general-image-shadow"
            />
          ) : (
            <Image
              src={generalImageUrl || ''}
              alt="SeaCargoImage"
              width={1000}
              height={1000}
              priority={true}
              className="w-full h-full object-cover relative z-20 rounded-xl general-image-shadow"
            />
          )}
          {/* <img src={generalImageUrl || ''} alt="SeaCargoImage" className="w-full h-full object-cover relative z-20 rounded-xl general-image-shadow" /> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPageSeaCargo;
