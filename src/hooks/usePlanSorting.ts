import { useMemo } from 'react';
import { sortPlans } from '@/utils/utilFunctions/sortPlans';

interface UsePlanSortingProps {
  plansSectionData?: any[];
  isYearly: boolean;
}

export const usePlanSorting = ({ plansSectionData, isYearly }: UsePlanSortingProps) => {
  const sortedPlans = useMemo(() => {
    // Since there are no yearly plans available, always return monthly plans
    // The toggle button state is handled separately for UI purposes
    const durationFilteredPlans = plansSectionData?.filter((_plan: any) => {
      // For now, always return monthly plans regardless of toggle state
      // When yearly plans are available, this logic can be updated
      return true; // Return all plans for now
    }) || [];

    // Then sort the filtered plans
    return sortPlans(durationFilteredPlans);
  }, [plansSectionData, isYearly]);

  return sortedPlans;
};
