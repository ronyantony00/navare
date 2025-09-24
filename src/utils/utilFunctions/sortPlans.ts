export const sortPlans = (plansSectionData: any[] | undefined) => {
  if (!plansSectionData || plansSectionData.length === 0) {
    return [];
  }

  // Create a copy to avoid mutating original array
  const plans = [...plansSectionData];

  // Find the "Most Popular" plan
  const popularPlanIndex = plans.findIndex(plan => (plan as any).tag === 'Most Popular');

  if (popularPlanIndex === -1) {
    // No "Most Popular" plan found, return original order
    return plans;
  }

  // Remove the popular plan from its current position
  const popularPlan = plans.splice(popularPlanIndex, 1)[0];

  if (popularPlan) {
    // Calculate the center position
    const centerIndex = Math.floor(plans.length / 2);

    // Insert the popular plan at the center
    plans.splice(centerIndex, 0, popularPlan);
  }

  return plans;
};
