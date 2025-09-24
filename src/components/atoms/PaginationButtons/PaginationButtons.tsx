import React from 'react';

interface PaginationButtonsProps {
  totalPages: number;
  currentPage: number;
  pageNumbers: number[];
  hasNextGroup: boolean;
  onPageChange: (page: number) => void;
  onNextGroup: () => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ totalPages, currentPage, pageNumbers, hasNextGroup, onPageChange, onNextGroup }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-space-28 md:mt-space-42 rounded-2xs w-fit mx-auto gap-[1px] bg-border-color p-px">
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`
            h-space-28 w-space-28 text-size-4xs font-normal leading-tight
            ${currentPage === pageNumber
          ? 'bg-primary text-black'
          : 'pagination-btn-bg text-white'
        }
          `}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={onNextGroup}
        disabled={!hasNextGroup}
        className={`
          h-space-28 w-space-50 text-size-4xs font-normal leading-tight
          ${hasNextGroup
      ? 'pagination-btn-bg text-white cursor-pointer'
      : 'text-white cursor-not-allowed pagination-btn-bg '
    }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
