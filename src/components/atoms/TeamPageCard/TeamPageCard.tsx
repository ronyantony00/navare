import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface TeamPageCardProps {
  name?: string;
  designation?: string;
  image?: string | StaticImageData;
  description?: string;
}

const TeamPageCard = ({ name, designation, image, description }: TeamPageCardProps) => {
  return (
    <div className="relative stories-card-bg w-full overflow-hidden h-fit gap-space-01 flex flex-col items-center 
    justify-center border-border-color rounded-md border hover:border-primary group">
      {/* Overlay: hidden by default, shown on hover */}
      <div className="absolute top-0 left-0 w-full !h-full hidden group-hover:block z-10">
        <div className="relative w-full h-full">
          <Image src={ImageConstants.TeamOverlay} alt="Team 1" width={500} height={500} className="absolute top-0 left-0 w-full h-full object-cover z-10" />
          <div className="w-full flex flex-col items-center justify-center p-space-10 gap-space-05 relative z-20">
            <div className="small-card-heading text-primary-content-white">{name}</div>
            <div className="text-primary very-small-heading !font-normal">{designation}</div>
            <div className="small-content text-primary-content-white text-center">{description}</div>
          </div>
        </div>
      </div>
      {/* Main image - always visible */}
      <div className="w-full md:h-space-200 sm:h-space-290 h-space-150">
        <Image
          src={image || ''}
          alt="Team 1"
          width={500}
          height={500}
          className="md:object-center object-cover w-full h-full rounded-md overflow-hidden rounded-b-md"
        />
      </div>
      {/* Name/designation at bottom - fade out on hover but keep space */}
      <div className="relative overflow-hidden w-full rounded-b-md flex flex-col items-center justify-center px-space-15 py-space-10 gap-space-06 transition-opacity duration-500 group-hover:opacity-0 group-hover:invisible">
        <div className="absolute z-10 w-space-80 h-space-80 sm:left-pct-060 left-pct-070 md:-bottom-pct-080 -bottom-pct-070  rounded-full bg-testimonial-card-blur opacity-30 blur-3xl "></div>
        <div className="w-full flex flex-col items-center justify-center pb-space-10 gap-space-05">
          <div className="small-card-heading text-primary-content-white">{name}</div>
          <div className="text-desc-text very-small-heading !font-normal">{designation}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamPageCard;
