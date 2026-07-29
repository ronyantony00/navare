import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface ServiceCardProps {
  className?: string;
  title?: string;
  description?: string;
  image?: string | StaticImageData;
  link?: string;
}

const ServiceCard = ({ className, title, description, image, link }: ServiceCardProps) => {
  return (
    <Link href={link || '/solutions'} className={`rounded-xl w-full sm:max-w-pct-080 overflow-hidden ${className}`}>
      <div className="flex flex-col gap-space-10 pb-space-07 px-space-08 w-full feature-card-bg relative z-20 rounded-xl">
        <div className="absolute z-10 w-space-80 h-space-200 sm:left-pct-060 left-pct-070 md:-bottom-pct-080 -bottom-pct-070 md:rotate-100 rotate-130 rounded-full bg-testimonial-card-blur opacity-60 blur-3xl "></div>
        <div className="flex flex-col gap-space-06 relative z-20">
          <div className="flex justify-between items-center">
            {image
              && (
                <div className="flex items-center pt-space-04 justify-between w-full">
                  <div className="h-space-12 flex items-center rounded-2xs p-space-02">
                    <Image
                      src={image}
                      alt="Navlogic"
                      width={130}
                      height={130}
                    />
                  </div>
                  <Image
                    src={ImageConstants.GreenArrow}
                    alt="Navlogic"
                    width={50}
                    height={50}
                    className="p-space-02 ml-auto"
                  />
                </div>
              )}
          </div>
          <div className="flex items-center">
            <div className="very-small-heading font-comme font-bold text-subtle-desc">{title}</div>
            {!image && (
              <Image
                src={ImageConstants.GreenArrow}
                alt="Navlogic"
                width={50}
                height={50}
                className="p-space-02 ml-auto"
              />
            )}
          </div>
          <div className="small-content text-hero-desc-color">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
