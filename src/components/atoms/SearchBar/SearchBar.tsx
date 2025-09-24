'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce the search query to limit how often onSearch is called
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-space-04 impact-card-bg rounded-md-2 border border-border-color py-space-12 px-space-08">
      <div className="very-small-heading text-primary-content-white font-bold ">Search</div>
      <div className="relative w-full">
        <Image src={ImageConstants.GreenSearchIcon} alt="search" width={24} height={24} className="absolute left-5 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full pt-space-04 pl-space-30 pr-space-03 pb-space-05 rounded-md-2 border border-border-color
          bg-navare-green text-subtle-desc placeholder-subtle-desc focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

export default SearchBar;
