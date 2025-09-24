'use client';
import type { FilterObject } from '@/types/interfaces';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface FilterSectionProps {
  locations: FilterObject[];
  selectedPlaces: FilterObject[];
  onSelectionChange: (location: FilterObject) => void;
  onApplyFilter: () => void;
  onClearFilters: () => void;
}

const FilterSection = ({ locations, selectedPlaces, onSelectionChange, onApplyFilter, onClearFilters }: FilterSectionProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleCheckboxChange = (place: typeof locations[number]) => {
    onSelectionChange(place);
  };

  // Filter locations based on searchValue
  const filteredLocations = locations.filter(location =>
    location.jobLocation.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="impact-card-bg rounded-md-3 border border-border-color px-space-10 2xs:px-space-09 pt-space-11 w-full h-fit relative overflow-hidden">
      <span className="bg-secondary-blur absolute -top-space-30 -right-space-30 w-full max-h-space-160 max-w-space-160 rounded-full h-full blur-3xl opacity-30 -rotate-45"></span>
      <div className="flex flex-col gap-space-08 w-full">
        <div className="pb-space-06 flex justify-between border-b border-border-color">
          <div className="very-small-heading text-text-placeholder">Filters</div>
          <button type="button" className="cursor-pointer z-50" onClick={onClearFilters}>
            <Image src={ImageConstants.RefreshIcon} width={18} height={18} alt="refresh-icon" className="w-space-09 h-space-09" />
          </button>
        </div>
        <div className="flex flex-col">
          <button type="button" className="flex justify-between mb-space-05 z-50 cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <div className="secondary-content text-text-placeholder">Location</div>
            <div className="h-fit my-auto">
              {isFilterOpen
                ? <Image src={ImageConstants.FilterMinusIcon} alt="plus-icon" width={24} height={24} />
                : <Image src={ImageConstants.FilterPlusIcon} alt="plus-icon" width={20} height={20} />}
            </div>
          </button>

          {isFilterOpen && (
            <div className="flex flex-col gap-space-01">
              {/* create this as an reusable component */}
              <div className="py-space-04 px-space-08 border border-border-color filter-card-bg rounded-xs w-full relative overflow-hidden">
                <span className="bg-secondary-blur absolute -right-space-30 w-full max-h-space-50 max-w-space-160 rounded-full h-full blur-2xl opacity-50 rotate-180 z-10"></span>
                <div className="flex items-center gap-space-04">
                  <Image src={ImageConstants.WhiteSearchIcon} width={26} height={26} alt="search-icon" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search locations"
                    className="flex-1 outline-none text-white placeholder:text-text-placeholder small-content relative z-50"
                  />
                </div>
              </div>
              {/* create this as an reusable component */}

              <div className="border border-border-color rounded-xs pt-space-09 px-space-14 pb-space-12 mb-space-11 md:mb-space-61 filter-section-shadow">
                <div className="flex flex-col gap-space-06">
                  {filteredLocations.length === 0
                    ? (
                        <div className="small-content text-text-placeholder text-center py-space-08">No results found</div>
                      )
                    : (
                        filteredLocations.map(location => (
                          <div className="flex items-center" key={location.id}>
                            <input
                              type="checkbox"
                              checked={selectedPlaces.some(p => p.id === location.id)}
                              onChange={() => handleCheckboxChange(location)}
                              className="custom-checkbox mr-space-16"
                            />
                            <div className="small-content text-text-placeholder flex-1">{location.jobLocation}</div>
                            <div className="caption text-text-placeholder">{location.count}</div>
                          </div>
                        ))
                      )}
                  <div className="mt-space-06"><Button animation variant="primary" text="Apply Filter" arrow={true} arrowClassName="size-space-05" mainClass="w-full gap-space-05" onClick={onApplyFilter} /></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
