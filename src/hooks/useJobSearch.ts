import type { JobData } from '@/types/apiTypes';
import { useCallback, useState } from 'react';

interface UseJobSearchProps {
  allCareersData: JobData[];
  onSearchTrigger?: (searchTerm: string) => void;
}

interface UseJobSearchReturn {
  searchInput: string;
  searchResults: JobData[];
  showSearchResults: boolean;
  isSearchActive: boolean;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchInputBlur: () => void;
  handleSearchResultClick: (job: JobData) => void;
  handleClearSearch: () => void;
  handleSearchSectionClick: () => void;
  hideSearchResults: () => void;
}

export const useJobSearch = ({ allCareersData, onSearchTrigger }: UseJobSearchProps): UseJobSearchReturn => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<JobData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
    } else {
      const filtered = allCareersData.filter((job: JobData) =>
        job.jobTitle.toLowerCase().includes(value.toLowerCase()),
      );

      // Deduplicate search results by job ID to prevent React key duplication errors
      const uniqueResults = filtered.filter((job, index, self) =>
        index === self.findIndex(j => j.id === job.id),
      );

      setSearchResults(uniqueResults);
      setShowSearchResults(uniqueResults.length > 0);
    }
  }, [allCareersData]);

  const handleSearchInputBlur = useCallback(() => {
    setTimeout(() => {
      if (searchInput.trim() === '') {
        setIsSearchActive(false);
        setShowSearchResults(false);
      }
    }, 200);
  }, [searchInput]);

  const handleSearchResultClick = useCallback((job: JobData) => {
    setSearchInput(job.jobTitle);
    setShowSearchResults(false);
    // Trigger search when a result is clicked
    if (onSearchTrigger) {
      onSearchTrigger(job.jobTitle);
    }
  }, [onSearchTrigger]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    setSearchResults([]);
    setShowSearchResults(false);
  }, []);

  const handleSearchSectionClick = useCallback(() => {
    setIsSearchActive(true);
  }, []);

  const hideSearchResults = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  return {
    searchInput,
    searchResults,
    showSearchResults,
    isSearchActive,
    handleSearchInputChange,
    handleSearchInputBlur,
    handleSearchResultClick,
    handleClearSearch,
    handleSearchSectionClick,
    hideSearchResults,
  };
};
