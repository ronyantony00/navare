function getMediaBaseUrl(): string {
  const cloudfront = process.env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME;
  if (cloudfront) {
    const hostname = cloudfront.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `https://${hostname}`;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  return apiBase.replace(/\/$/, '');
}

/**
 * Builds a full media URL from Strapi/CDN paths (e.g. `/uploads/video.mp4`).
 */
export const getImageUrl = (imagePath: unknown): string => {
  if (!imagePath) {
    return '';
  }

  const path = typeof imagePath === 'object' && imagePath !== null && 'url' in imagePath
    ? (imagePath as { url?: string }).url
    : imagePath;

  if (typeof path !== 'string') {
    return '';
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return '';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const baseUrl = getMediaBaseUrl();
  if (!baseUrl) {
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${baseUrl}${normalizedPath}`;
};
