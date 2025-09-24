export const truncateText = (text: string, wordLimit: number): { truncated: string; hasMore: boolean } => {
  if (!text) {
    return { truncated: '', hasMore: false };
  }

  const words = text.split(' ');
  if (words.length <= wordLimit) {
    return { truncated: text, hasMore: false };
  }

  return {
    truncated: words.slice(0, wordLimit).join(' '),
    hasMore: true,
  };
};

export function formatDateToLongString(isoString: string): string {
  if (!isoString) {
    return '';
  }
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
