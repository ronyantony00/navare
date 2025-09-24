import FilterButtonGroup from '@/components/molecules/FilterButtonGroup/FilterButtonGroup';
import SortControl from '@/components/molecules/SortControl/SortControl';

interface Filter {
  value: string;
  label: string;
}

interface SortOption {
  value: string;
  label: string;
  direction?: 'asc' | 'desc';
}

interface PageHeaderProps {
  title: string;
  filters?: Filter[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  sortOptions?: SortOption[];
  currentSort?: string;
  onSortChange?: (sort: string) => void;
}

const PageHeader = ({
  title,
  filters,
  activeFilter,
  onFilterChange,
  sortOptions,
  currentSort,
  onSortChange,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-space-30 mb-space-16">
      <div className="max-w-space-400 w-full self-center">
        <FilterButtonGroup
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>
      <div className="flex justify-between">
        <div className="text-size-md md:text-size-2md 2md:text-size-xl font-bold">{title}</div>
        <div className="hidden sm:flex items-center">
          <SortControl
            sortOptions={sortOptions}
            currentSort={currentSort}
            onSortChange={onSortChange}
            aria-label="Sort results"
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
