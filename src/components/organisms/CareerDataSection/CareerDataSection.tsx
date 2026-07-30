'use client';

import type { JobData } from '@/types/apiTypes';
import type { FilterObject } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import JobCard from '@/components/atoms/JobCard/JobCard';
import FilterSection from '@/components/molecules/FilterSection/FilterSection';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractUniqueLocations } from '@/utils/utilFunctions/extractUniqueLocations';

interface CareerDataSectionProps {
  careersData: JobData[];
}

const CareerDataSection = ({ careersData }: CareerDataSectionProps) => {
  const [selectedLocations, setSelectedLocations] = useState<FilterObject[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterObject[]>([]);

  const t = useTranslations('CareersJobListing');
  const uniqueLocations = extractUniqueLocations(careersData);

  const handleLocationSelectionChange = (location: FilterObject) => {
    setSelectedLocations((prev: FilterObject[]) => {
      const exists = prev.some(p => p.id === location.id);
      if (exists) {
        // Remove location if it exists
        return prev.filter(p => p.id !== location.id);
      } else {
        // Add location if it doesn't exist
        return [...prev, location];
      }
    });
  };

  const getFilteredJobs = () => {
    // Use appliedFilters instead of selectedLocations
    if (appliedFilters.length === 0) {
      return careersData;
    }

    const appliedLocationNames = appliedFilters.map(loc => loc.jobLocation);
    return careersData.filter(job =>
      appliedLocationNames.includes(job.jobLocation),
    );
  };

  const handleApplyFilter = () => {
    setAppliedFilters([...selectedLocations]);
  };

  const handleClearFilters = () => {
    setSelectedLocations([]);
    setAppliedFilters([]);
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="flex flex-col gap-space-10 md:gap-space-16 w-full">
      <div className="py-space-09 w-full flex justify-center border-b border-border-color gap-space-06">
        <Image src={ImageConstants.WhiteSearchIcon} width={26} height={26} alt="search-icon" />
        <div className="primary-content text-text-placeholder">{t('SearchIconText')}</div>
      </div>
      <div className="flex flex-col md:flex-row gap-space-24 lg:gap-space-40">
        <div className="md:max-w-space-160 w-full z-10">
          <FilterSection
            locations={uniqueLocations}
            selectedPlaces={selectedLocations}
            onSelectionChange={handleLocationSelectionChange}
            onApplyFilter={handleApplyFilter}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className="flex flex-col gap-space-16 md:gap-space-32 w-full">
          <div className="w-full grid grid-cols-1 2md:grid-cols-2 gap-space-12">
            {filteredJobs.map((job: JobData, index: number) => ( // need to apply pagination here
              <div key={index}>
                <JobCard
                  title={job.jobTitle}
                  department={job.department?.departmentName || ''}
                  location={job.jobLocation}
                  employmentType={job.employmentType?.employmentType || ''}
                  href={`/careers/${job.slug}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center"><Button variant="primary" text="View More" mainClass="w-space-68" /></div>
        </div>
      </div>
    </div>
  );
};

export default CareerDataSection;
