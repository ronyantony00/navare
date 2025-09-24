import { useCallback } from 'react';
import FilterButton from '@/components/atoms/FilterButton/FilterButton';

interface Filter {
  value: string;
  label: string;
}

interface FilterButtonGroupProps {
  filters?: Filter[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const FilterButtonGroup = ({ filters = [], activeFilter, onFilterChange }: FilterButtonGroupProps) => {
  const handleFilterClick = useCallback((filterValue: string) => {
    onFilterChange?.(filterValue);
  }, [onFilterChange]);

  return (
    <div className="flex flex-col 2md:flex-row gap-2" role="group" aria-label="Filter content by category">
      {filters.map(filter => (
        <FilterButton
          key={filter.value}
          variant="primary"
          active={activeFilter === filter.value}
          onClick={() => handleFilterClick(filter.value)}
          role="tab"
          aria-selected={activeFilter === filter.value}
        >
          {filter.label}
        </FilterButton>
      ))}
    </div>
  );
};

export default FilterButtonGroup;
