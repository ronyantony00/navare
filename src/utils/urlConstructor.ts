/**
 * Generates a complete image URL by prepending the base URL to the provided image path
 * @param imagePath - The relative path to the image (e.g., '/uploads/image.jpg')
 * @returns The complete image URL
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return '';
  }

  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath;

  // Combine base URL with image path
  return cleanPath;
};
