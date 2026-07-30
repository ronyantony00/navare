import type { JobData } from '@/types/apiTypes';
import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import JobGrid from '@/components/atoms/JobGrid/JobGrid';
import Spinner from '@/components/atoms/Spinner/Spinner';

interface JobListingContentProps {
  jobs: JobData[];
  isLoadingFilters: boolean;
  isSearching: boolean;
  error: string | null;
  searchInput: string;
  appliedFilters: any[];
  currentPage: number;
  totalPages: number;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

const JobListingContent: React.FC<JobListingContentProps> = ({
  jobs,
  isLoadingFilters,
  isSearching,
  error,
  searchInput,
  appliedFilters,
  currentPage,
  totalPages,
  isLoadingMore,
  onLoadMore,
}) => {
  const t = useTranslations('CareersJobListing');

  if (isLoadingFilters || isSearching) {
    return (
      <div className="h-full flex justify-center items-center w-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-space-32 text-center mx-auto">
        <div className="text-text-placeholder text-sm font-medium mb-space-8">
          {t('error_occurred')}
        </div>
        <div className="text-text-placeholder text-md">
          {error}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    const hasSearchInput = searchInput.trim() !== '';
    const hasAppliedFilters = appliedFilters.length > 0;

    let message = t('no_jobs_found');

    if (hasSearchInput && hasAppliedFilters) {
      message = t('no_jobs_search_and_filters');
    } else if (hasSearchInput) {
      message = t('no_jobs_search');
    } else if (hasAppliedFilters) {
      message = t('no_jobs_filters');
    }

    return (
      <div className="flex flex-col items-center justify-center py-space-32 text-center w-full">
        <div className="text-subtle-desc card-title mb-space-07">
          {message}
        </div>
        <div className="text-subtle-desc small-content">
          {t('try_different_search')}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-space-08 md:gap-space-12 w-full">
      <JobGrid jobs={jobs} />

      {/* Pagination button */}
      {currentPage < totalPages && jobs.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="primary"
            text={isLoadingMore ? t('loading') : t('view_more')}
            disabled={isLoadingMore}
            mainClass="w-space-68"
            onClick={onLoadMore}
          />
        </div>
      )}
    </div>
  );
};

export default JobListingContent;
