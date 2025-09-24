import Image from 'next/image';
import React, { useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface TeamFilterTabProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  'All',
  'Commercial / Leadership',
  'Finance',
  'Engineering & Tech',
];

const TeamFilterTab = ({ selectedCategory, onSelectCategory }: TeamFilterTabProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemSelect = (category: string) => (event: React.SyntheticEvent) => {
    event.stopPropagation();
    onSelectCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop version - lg and above */}
      <div className="hidden lg:flex flex-col min-w-space-160 gap-space-15 stories-card-bg rounded-md p-space-08">
        {categories.map(category => (
          category === 'All'
            ? (
                <div
                  key={category}
                  className={`text-size-3xs font-bold text-white cursor-pointer ${selectedCategory === category ? 'text-primary' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectCategory(category)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectCategory(category);
                    }
                  }}
                >
                  {category}
                </div>
              )
            : (
                <div
                  key={category}
                  className={`flex items-center justify-between gap-space-05 border rounded-md border-border-color p-space-05 cursor-pointer ${selectedCategory === category ? 'border-primary bg-primary/10 text-white' : 'hover:border-primary text-desc-text'}`}
                  onClick={e => handleItemSelect(category)(e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectCategory(category);
                    }
                  }}
                >
                  <div className="flex items-center gap-space-05">
                    <Image src={ImageConstants.GreenSquareIcon} alt="Team 1" width={500} height={500} className="size-space-10" />
                    <div className="text-size-3xs font-bold">{category}</div>
                  </div>
                  <Image src={ImageConstants.GreenArrow} alt="Team 1" width={500} height={500} className="size-space-20" />
                </div>
              )
        ))}
      </div>

      {/* Mobile/Tablet dropdown version - below lg */}
      <div className="lg:hidden relative w-full">
        <div
          className="w-full flex items-center justify-between gap-space-05 border rounded-md border-border-color p-space-05 cursor-pointer stories-card-bg hover:border-primary"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsDropdownOpen(!isDropdownOpen);
            }
          }}
        >
          <div className="flex items-center gap-space-05">
            <Image src={ImageConstants.GreenSquareIcon} alt="Filter" width={500} height={500} className="size-space-10" />
            <div className="text-white text-size-3xs font-bold">{selectedCategory}</div>
          </div>
          <Image
            src={ImageConstants.GreenArrow}
            alt="Toggle"
            width={500}
            height={500}
            className={`size-space-20 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-space-02 border border-border-color rounded-md stories-card-bg z-20">
            {categories.map(category => (
              category === 'All'
                ? (
                    <div
                      key={category}
                      className={`text-size-3xs font-bold text-white cursor-pointer p-space-05 ${selectedCategory === category ? 'text-primary bg-primary/10' : 'hover:bg-primary/5'}`}
                      role="button"
                      tabIndex={0}
                      onClick={handleItemSelect(category)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleItemSelect(category)(e);
                        }
                      }}
                    >
                      {category}
                    </div>
                  )
                : (
                    <div
                      key={category}
                      className={`flex items-center gap-space-05 p-space-05 cursor-pointer ${selectedCategory === category ? 'bg-primary/10 text-white' : 'hover:bg-primary/5 text-desc-text'}`}
                      onClick={handleItemSelect(category)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleItemSelect(category)(e);
                        }
                      }}
                    >
                      <Image src={ImageConstants.GreenSquareIcon} alt="Category" width={500} height={500} className="size-space-10" />
                      <div className="text-size-3xs font-bold">{category}</div>
                    </div>
                  )
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TeamFilterTab;
