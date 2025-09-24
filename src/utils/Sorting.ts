// Utility Function for Sorting
export type SortOption = 'name-asc' | 'name-desc';

export interface SortableItem {
  title: string;
  id?: string | number;
  createdAt?: string | Date;
}

export const sortItems = <T extends SortableItem>(
  items: T[],
  sortOption: SortOption,
): T[] => {
  if (!Array.isArray(items) || items.length === 0) {
    return items || [];
  }

  return [...items].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'name-desc':
        return (b.title || '').localeCompare(a.title || '');
      default:
        return 0;
    }
  });
};

export const isValidSortOption = (sort: string): sort is SortOption => {
  return ['name-asc', 'name-desc', 'date-desc', 'date-asc'].includes(sort as SortOption);
};
