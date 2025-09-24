import type { JobData, PaginationMeta } from '@/types/apiTypes';
import { useCallback, useState } from 'react';

interface UseJobPaginationProps {
  initialJobs: JobData[];
  paginationMeta?: PaginationMeta;
}

interface UseJobPaginationReturn {
  jobs: JobData[];
  currentPage: number;
  totalPages: number;
  setJobs: (jobs: JobData[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  addMoreJobs: (newJobs: JobData[]) => void;
}

export const useJobPagination = ({
  initialJobs,
  paginationMeta,
}: UseJobPaginationProps): UseJobPaginationReturn => {
  const [jobs, setJobs] = useState<JobData[]>(initialJobs);
  const [currentPage, setCurrentPage] = useState<number>(paginationMeta?.page ?? 1);
  const [totalPages, setTotalPages] = useState<number>(paginationMeta?.pageCount ?? 1);

  const addMoreJobs = useCallback((newJobs: JobData[]) => {
    setJobs((prev) => {
      const existingIds = new Set(prev.map(job => job.id));
      const uniqueNewJobs = newJobs.filter(job => !existingIds.has(job.id));

      return [...prev, ...uniqueNewJobs];
    });
    setCurrentPage(prev => prev + 1);
  }, []);

  return {
    jobs,
    currentPage,
    totalPages,
    setJobs,
    setCurrentPage,
    setTotalPages,
    addMoreJobs,
  };
};
