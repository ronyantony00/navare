'use client';

import type { JobData, PaginationMeta } from '@/types/apiTypes';
import type { title } from '@/types/usecase';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import SearchInput from '@/components/atoms/SearchInput/SearchInput';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import FilterSection from '@/components/molecules/FilterSection/FilterSection';
import JobListingContent from '@/components/molecules/JobListingContent/JobListingContent';
import { useJobFilters } from '@/hooks/useJobFilters';
import { useJobPagination } from '@/hooks/useJobPagination';
import { useJobSearch } from '@/hooks/useJobSearch';
import { JobService } from '@/services/jobService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { extractUniqueLocations } from '@/utils/utilFunctions/extractUniqueLocations';

interface CareerDataSectionProps {
  careersData: JobData[];
  paginationMeta?: PaginationMeta;
  allCareersData: JobData[];
  sectionTitle: {
    tag?: string;
    title?: title[];
    description?: string;
  };
}

const CareerDataSection = ({ careersData, paginationMeta, allCareersData, sectionTitle }: CareerDataSectionProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(sectionTitle?.title);

  const t = useTranslations('CareersJobListing');
  const uniqueLocations = extractUniqueLocations(allCareersData);
  const pageSize = paginationMeta?.pageSize ?? 4;

  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { jobs, currentPage, totalPages, setJobs, setCurrentPage, setTotalPages, addMoreJobs } = useJobPagination({
    initialJobs: careersData,
    paginationMeta,
  });
  const { selectedLocations, appliedFilters, handleLocationSelectionChange, handleApplyFilter, handleClearFilters } = useJobFilters();

  // Unified search function that can be called from both Enter key and dropdown selection
  const performSearch = useCallback(async (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      return;
    }

    setIsSearching(true);
    setError(null);
    try {
      const response = await JobService.searchJobs({
        page: 1,
        pageSize,
        filters: appliedFilters,
        searchTerm: searchTerm.trim(),
      });
      setJobs(response.data);
      setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching jobs:', error);
      setError('Failed to search jobs. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [pageSize, appliedFilters, setJobs, setTotalPages, setCurrentPage]);

  const { searchInput, searchResults, showSearchResults, isSearchActive, handleSearchInputChange, handleSearchInputBlur, handleSearchResultClick, handleClearSearch, handleSearchSectionClick, hideSearchResults } = useJobSearch({
    allCareersData,
    onSearchTrigger: performSearch, // Pass the search function to the hook
  });

  // Handle search submission (Enter key)
  const handleSearchSubmit = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      hideSearchResults(); // Hide the search dropdown
      performSearch(searchInput);
    }
  }, [searchInput, performSearch, hideSearchResults]);

  // Handle filter application
  const handleFilterApply = useCallback(async () => {
    if (selectedLocations.length === 0) {
      setError('Please select at least one location to filter.');
      return;
    }

    setIsLoadingFilters(true);
    setError(null);
    hideSearchResults(); // Hide search results when filters are applied
    try {
      handleApplyFilter();
      const response = await JobService.getJobsWithFilters({
        page: 1,
        pageSize,
        filters: selectedLocations,
      });
      setJobs(response.data);
      setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error applying filters:', error);
      setError('Failed to apply filters. Please try again.');
    } finally {
      setIsLoadingFilters(false);
    }
  }, [selectedLocations, pageSize, handleApplyFilter, setJobs, setTotalPages, setCurrentPage, hideSearchResults]);

  // Handle filter clearing
  const handleFilterClear = useCallback(async () => {
    setIsLoadingFilters(true);
    setError(null);
    hideSearchResults(); // Hide search results when filters are cleared
    try {
      handleClearFilters();
      const response = await JobService.getJobs({
        page: 1,
        pageSize,
      });
      setJobs(response.data);
      setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error clearing filters:', error);
      setError('Failed to clear filters. Please try again.');
    } finally {
      setIsLoadingFilters(false);
    }
  }, [pageSize, handleClearFilters, setJobs, setTotalPages, setCurrentPage, hideSearchResults]);

  // Handle search clearing
  const handleSearchClear = useCallback(async () => {
    setIsSearching(true);
    setError(null);
    hideSearchResults(); // Hide search results when search is cleared
    try {
      handleClearSearch();
      // Reset to show all jobs with current filters
      const response = await JobService.getJobsWithFilters({
        page: 1,
        pageSize,
        filters: appliedFilters,
      });
      setJobs(response.data);
      setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error clearing search:', error);
      setError('Failed to clear search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [pageSize, appliedFilters, handleClearSearch, setJobs, setTotalPages, setCurrentPage, hideSearchResults]);

  // Handle load more
  const handleLoadMoreJobs = useCallback(async () => {
    if (currentPage >= totalPages) {
      return;
    }

    setIsLoadingMore(true);
    setError(null);
    try {
      const response = await JobService.searchJobs({
        page: currentPage + 1,
        pageSize,
        filters: appliedFilters,
        searchTerm: searchInput.trim() || undefined,
      });
      addMoreJobs(response.data);
    } catch (error) {
      console.error('Error loading more jobs:', error);
      setError('Failed to load more jobs. Please try again.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, totalPages, pageSize, appliedFilters, searchInput, addMoreJobs]);

  // Clear errors when filters or search change
  useEffect(() => {
    if (appliedFilters.length > 0 || searchInput.trim() !== '') {
      setError(null);
    }
  }, [appliedFilters, searchInput]);

  // Auto-reset to initial data when search input becomes empty
  useEffect(() => {
    if (searchInput.trim() === '' && !isSearching) {
      // Reset to show all jobs with current filters when search is cleared
      const resetToInitialData = async () => {
        try {
          const response = await JobService.getJobsWithFilters({
            page: 1,
            pageSize,
            filters: appliedFilters,
          });
          setJobs(response.data);
          setTotalPages(response.meta?.pagination?.pageCount ?? 1);
          setCurrentPage(1);
          setError(null);
        } catch (error) {
          console.error('Error resetting to initial data:', error);
          setError('Failed to reset to initial data. Please try again.');
        }
      };

      resetToInitialData();
    }
  }, [searchInput, appliedFilters, pageSize, setJobs, setTotalPages, setCurrentPage, isSearching]);

  return (
    <div className="flex flex-col gap-space-20 md:gap-space-40 w-full section-padding-x section-padding-y">
      <div className="w-full flex justify-center">
        <TextCombo
          smallText={sectionTitle?.tag}
          title={titlePrefix}
          spanText={titleHighlight}
          extraTitle={titleSuffix}
          titleClass="section-title"
          textClass="sm:max-w-pct-080 md:max-w-pct-070 mx-auto"
          description={sectionTitle?.description}
          className="text-center"
          descClass="sm:max-w-pct-080 md:max-w-pct-050 mx-auto"
        />
      </div>
      <SearchInput
        value={searchInput}
        onChange={handleSearchInputChange}
        onKeyPress={handleSearchSubmit}
        onBlur={handleSearchInputBlur}
        placeholder={t('SearchIconText')}
        isActive={isSearchActive}
        onSectionClick={handleSearchSectionClick}
        onClear={handleSearchClear}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        onResultClick={handleSearchResultClick}
      />

      <div className="flex flex-col md:flex-row gap-space-24 lg:gap-space-40">
        <div className="md:max-w-space-160 w-full z-10">
          <FilterSection
            locations={uniqueLocations}
            selectedPlaces={selectedLocations}
            onSelectionChange={handleLocationSelectionChange}
            onApplyFilter={handleFilterApply}
            onClearFilters={handleFilterClear}
          />
        </div>

        <JobListingContent
          jobs={jobs}
          isLoadingFilters={isLoadingFilters}
          isSearching={isSearching}
          error={error}
          searchInput={searchInput}
          appliedFilters={appliedFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMoreJobs}
        />
      </div>
    </div>
  );
};

export default CareerDataSection;
