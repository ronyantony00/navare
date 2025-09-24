import type { legalCard, legalDocument, legalPageData, legalPageListCategory } from '@/types/apiTypes';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface CategoryMapping {
  slug: string;
  title: string;
}

interface GroupedCategory {
  title: string;
  links: { title: string; href: string }[];
}

interface LegalIcons {
  dataProtectionIcon?: string;
  intellectualPropertyIcon?: string;
  termsOfServiceIcon?: string;
}

/**
 * Determines the appropriate category for a legal document based on its legal_document_category
 * @param document - The legal document to categorize
 * @returns Category mapping with slug and title
 */
export const getCategoryForDocument = (document: legalDocument): CategoryMapping => {
  // Use the legal_document_category from the document data
  const categorySlug = document.legalDocumentCategory?.slug;
  const categoryTitle = document.legalDocumentCategory?.title;

  // Map the category slug to our expected format
  switch (categorySlug) {
    case 'data-protection':
      return { slug: 'data-protection', title: categoryTitle || 'Data Protection' };
    case 'intellectual-property':
    case 'intellectual-propety': // Handle typo in backend data
      return { slug: 'intellectual-property', title: categoryTitle || 'Intellectual Property' };
    case 'terms-of-service':
      return { slug: 'terms-of-service', title: categoryTitle || 'Terms of Service' };
    default:
      // Fallback to data-protection if category is not recognized
      return { slug: 'data-protection', title: categoryTitle || 'Data Protection' };
  }
};

/**
 * Gets the appropriate icon for a legal category based on its slug and available icons
 * @param categorySlug - The category slug
 * @param icons - Available icons from legalPageData
 * @returns The icon URL or static asset
 */
export const getIconForCategory = (categorySlug: string, icons?: LegalIcons): string => {
  switch (categorySlug.toLowerCase()) {
    case 'data-protection':
      return icons?.dataProtectionIcon || ImageConstants.DataProtectionIcon;
    case 'intellectual-property':
      return icons?.intellectualPropertyIcon || ImageConstants.PropertyIcon;
    case 'terms-of-service':
      return icons?.termsOfServiceIcon || ImageConstants.LegalIcon;
    default:
      return ImageConstants.LegalIcon; // Default icon
  }
};

/**
 * Extracts icons from legalPageData
 * @param legalPageData - The legal page data containing icons
 * @returns Object with icon URLs
 */
export const extractIconsFromLegalPageData = (legalPageData?: legalPageData): LegalIcons => {
  if (!legalPageData) {
    return {};
  }

  return {
    dataProtectionIcon: legalPageData.data_protection_icon?.url ? getImageUrl(legalPageData.data_protection_icon.url) : undefined,
    intellectualPropertyIcon: legalPageData.intellectual_propety?.url ? getImageUrl(legalPageData.intellectual_propety.url) : undefined,
    termsOfServiceIcon: legalPageData.terms_of_service?.url ? getImageUrl(legalPageData.terms_of_service.url) : undefined,
  };
};

/**
 * Transforms legal documents into categorized legal cards
 * @param documents - Array of legal documents
 * @param legalPageData - Optional legal page data containing icons
 * @returns Array of legal cards grouped by category
 */
export const transformLegalDocumentsToCards = (documents: legalDocument[], legalPageData?: legalPageData): legalCard[] => {
  if (!documents || !Array.isArray(documents)) {
    return [];
  }

  // Extract icons from legalPageData
  const icons = extractIconsFromLegalPageData(legalPageData);

  // Group documents by category slug
  const groupedByCategory = documents.reduce((acc, document) => {
    const category = getCategoryForDocument(document);

    if (!acc[category.slug]) {
      acc[category.slug] = {
        title: category.title,
        links: [],
      };
    }

    acc[category.slug]!.links.push({
      title: document.Title,
      href: `/website-terms-of-use?slug=${document.slug}`,
    });

    return acc;
  }, {} as Record<string, GroupedCategory>);

  // Define the desired order of categories
  const categoryOrder = ['data-protection', 'intellectual-property', 'terms-of-service'];

  // Convert grouped data to legalCard format with appropriate icons in the specified order
  return categoryOrder
    .filter(categorySlug => groupedByCategory[categorySlug]) // Only include categories that have documents
    .map((categorySlug, index) => {
      const categoryData = groupedByCategory[categorySlug]!;
      const iconUrl = getIconForCategory(categorySlug, icons);

      return {
        id: index + 1,
        title: categoryData.title,
        icon: iconUrl,
        linkSection: categoryData.links,
      };
    });
};

/**
 * Transforms legal page list categories into legal cards
 * @param categories - Array of legal page list categories
 * @returns Array of legal cards with category data
 */
export const transformLegalPageListCategoriesToCards = (categories: legalPageListCategory[]): legalCard[] => {
  if (!categories || !Array.isArray(categories)) {
    return [];
  }

  // Sort categories by order
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // Convert categories to legalCard format
  return sortedCategories.map(category => ({
    id: category.id,
    title: category.title,
    icon: category.icon?.url ? getImageUrl(category.icon.url) : '',
    linkSection: [], // Empty links array since this is just category data
  }));
};

export const mergeCategoriesWithContent = (
  categories: legalPageListCategory[] = [],
  documents: { Title: string; slug: string; legalDocumentCategory?: { slug?: string } }[] = [],
): legalCard[] => {
  if (!Array.isArray(categories)) {
    return [];
  }

  // Index documents by category slug
  const docsByCategory = documents.reduce<Record<string, { title: string; href: string }[]>>((acc, doc) => {
    const catSlug = doc.legalDocumentCategory?.slug || '';
    if (!catSlug) {
      return acc;
    }
    if (!acc[catSlug]) {
      acc[catSlug] = [];
    }
    acc[catSlug].push({ title: doc.Title, href: `/website-terms-of-use?slug=${doc.slug}` });
    return acc;
  }, {});

  // Sort categories by order and map to cards
  return [...categories]
    .sort((a, b) => a.order - b.order)
    .map(cat => ({
      id: cat.id,
      title: cat.title,
      icon: cat.icon?.url ? getImageUrl(cat.icon.url) : '',
      linkSection: docsByCategory[cat.slug] || [],
    }));
};
