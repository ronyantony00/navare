import type { JobData } from '@/types/apiTypes';
/**
 * Extracts unique job locations and counts the number of job vacancies for each location
 * @param {Array} careersData - Array of job data objects
 * @returns {Array} Array of location objects with id, jobLocation, and count
 */
export const extractUniqueLocations = (careersData: JobData[]) => {
  if (!careersData || !Array.isArray(careersData) || careersData.length === 0) {
    return [];
  }
  const locationCountMap = new Map();

  careersData.forEach((job) => {
    const location = job.job_locations?.jobLocation;

    if (!location || location.trim() === '') {
      return;
    }

    const normalizedLocation = location.trim();

    if (locationCountMap.has(normalizedLocation)) {
      locationCountMap.set(normalizedLocation, locationCountMap.get(normalizedLocation) + 1);
    } else {
      locationCountMap.set(normalizedLocation, 1);
    }
  });

  const locationArray = Array.from(locationCountMap.entries()).map(([location, count], index) => ({
    id: index + 1,
    jobLocation: location,
    count,
  }));
  return locationArray.sort((a, b) => a.jobLocation.localeCompare(b.jobLocation));
};
