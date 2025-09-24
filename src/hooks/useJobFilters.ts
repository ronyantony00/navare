import type { FilterObject } from '@/types/interfaces';
import { useCallback, useState } from 'react';

interface UseJobFiltersReturn {
  selectedLocations: FilterObject[];
  appliedFilters: FilterObject[];
  handleLocationSelectionChange: (location: FilterObject) => void;
  handleApplyFilter: () => void;
  handleClearFilters: () => void;
}

export const useJobFilters = (): UseJobFiltersReturn => {
  const [selectedLocations, setSelectedLocations] = useState<FilterObject[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterObject[]>([]);

  const handleLocationSelectionChange = useCallback((location: FilterObject) => {
    setSelectedLocations((prev: FilterObject[]) => {
      const exists = prev.some(p => p.id === location.id);
      if (exists) {
        return prev.filter(p => p.id !== location.id);
      } else {
        return [...prev, location];
      }
    });
  }, []);

  const handleApplyFilter = useCallback(() => {
    setAppliedFilters([...selectedLocations]);
  }, [selectedLocations]);

  const handleClearFilters = useCallback(() => {
    setSelectedLocations([]);
    setAppliedFilters([]);
  }, []);

  return {
    selectedLocations,
    appliedFilters,
    handleLocationSelectionChange,
    handleApplyFilter,
    handleClearFilters,
  };
};
