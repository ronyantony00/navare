import { useCallback, useState } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  pagesPerGroup?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  currentGroup: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  startPage: number;
  endPage: number;
  hasNextGroup: boolean;
  handlePageChange: (page: number) => void;
  handleNextGroup: () => void;
}

export const usePagination = ({
  totalItems,
  itemsPerPage = 4,
  pagesPerGroup = 2,
}: UsePaginationProps): UsePaginationReturn => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0); // Which group of pages we're showing

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Calculate which pages to show in current group
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const hasNextGroup = endPage < totalPages;

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Handle next group
  const handleNextGroup = useCallback(() => {
    setCurrentGroup(currentGroup + 1);
    // Optionally, set current page to first page of next group
    const nextGroupFirstPage = (currentGroup + 1) * pagesPerGroup + 1;
    setCurrentPage(nextGroupFirstPage);
  }, [currentGroup, pagesPerGroup]);

  return {
    currentPage,
    currentGroup,
    totalPages,
    startIndex,
    endIndex,
    startPage,
    endPage,
    hasNextGroup,
    handlePageChange,
    handleNextGroup,
  };
};
