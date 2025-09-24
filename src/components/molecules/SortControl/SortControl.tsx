import { useCallback } from 'react';
import IntegrationSelect from '@/components/atoms/IntegrationSelect/IntegrationSelect';

interface SortOption {
  value: string;
  label: string;
}

interface SortControlProps {
  sortOptions?: SortOption[];
  currentSort?: string;
  onSortChange?: (sort: string) => void;
}

const SortControl = ({ sortOptions = [], currentSort, onSortChange }: SortControlProps) => {
  const handleSortChange = useCallback((value: string) => {
    onSortChange?.(value);
  }, [onSortChange]);

  return (
    <div className="flex items-center gap-2">
      <IntegrationSelect
        options={sortOptions}
        value={currentSort}
        onChange={handleSortChange}
        className="min-w-36"
        aria-label="Sort results by"
      />
    </div>
  );
};

export default SortControl;
