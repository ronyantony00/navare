'use client';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  href: string;
}

const JobCard: React.FC<JobCardProps> = memo(({ title, department, location, employmentType, href }) => {
  return (
    <div className="size-full">
      <Link
        href={href || '#'}
        className="block size-full group duration-200 stories-card-bg rounded-lg border border-border-color"
        aria-label={`View ${title} position in ${department}`}
      >
        <div className="flex flex-col h-full justify-between gap-space-12 p-space-10">
          <div className="flex flex-col gap-space-06">
            {employmentType && (
              <div className="flex justify-end w-full">
                <div className="text-primary h-fit text-size-4xs border border-border-color bg-container-gradient rounded-sm px-space-05 py-space-02">
                  {employmentType}
                </div>
              </div>
            )}
            <div className="flex items-center gap-space-08 sm:gap-space-10">
              <Image src={ImageConstants.Globe_icon} alt="Globe" width={54} height={54} className="size-space-20" />
              <div className="text-subtle-desc h-fit text-size-3xs">
                {department}
              </div>
            </div>
            <div className="flex flex-col gap-space-06 mt-space-04">
              <div className="text-size-xs font-medium text-subtle-desc leading-sub-title">
                {title}
              </div>
              <div className="flex gap-space-03">
                <Image src={ImageConstants.LocationIcon} alt="Location" width={16} height={16} />
                <div className="text-size-3xs text-text-placeholder">
                  {location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="self-center text-primary font-bold button-text group-hover:underline">Apply Now</div>
            <Image
              src={ImageConstants.GreenArrow}
              alt="Arrow Right"
              width={32}
              height={32}
              className="pt-space-01"
            />
          </div>
        </div>
      </Link>
    </div>
  );
});

export default JobCard;
