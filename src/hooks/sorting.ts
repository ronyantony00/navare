import { useCallback, useMemo, useState } from 'react';

export type SortOption = 'name-asc' | 'name-desc' | 'recent';

export interface SortableItem {
  badges: any;
  id?: number;
  title: string;
}

interface UseSortingReturn<T> {
  currentSort: string;
  handleSortChange: (sort: string) => void;
  sortItems: (items: T[]) => T[];
}

export const useSorting = <T extends SortableItem>(
  initialSort: string = 'name-asc',
): UseSortingReturn<T> => {
  const [currentSort, setCurrentSort] = useState(initialSort);

  const handleSortChange = useCallback((sort: string) => {
    setCurrentSort(sort);
  }, []);

  const sortItems = useMemo(() => {
    return (items: T[]): T[] => {
      return [...items].sort((a, b) => {
        switch (currentSort as SortOption) {
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'recent':
            return (b.id || 0) - (a.id || 0);
          default:
            return 0;
        }
      });
    };
  }, [currentSort]);

  return {
    currentSort,
    handleSortChange,
    sortItems,
  };
};
