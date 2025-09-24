interface DateInfo {
  day: number | null;
  month: string | null;
  year: number | null;
}

/**
 * Extracts day, month, and year from a date string
 * @param date - The date string to format
 * @returns Object containing day (number), month (string), and year (number) or null values if invalid
 */
export const formatDateToDayMonth = (date?: string): DateInfo => {
  let day: number | null = null;
  let month: string | null = null;
  let year: number | null = null;

  if (date) {
    const dateObj = new Date(date);
    if (!Number.isNaN(dateObj.getTime())) {
      day = dateObj.getDate();
      month = dateObj.toLocaleDateString('en-US', { month: 'short' });
      year = dateObj.getFullYear();
    }
  }

  return { day, month, year };
};
