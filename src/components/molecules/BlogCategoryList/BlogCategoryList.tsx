import type { BlogCategory } from '@/types/insights';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import CategoryContainer from '@/components/atoms/CategoryContainer/CategoryContainer';
import { DOM_RENDER_DELAY, findHeadingElement, scrollToElement } from '@/utils/scrollspy';

interface BlogCategoryListProps {
  categories?: BlogCategory[];
  filters?: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  blogTitles?: string[];
}

const BlogCategoryList = ({
  filters,
  activeFilter,
  onFilterChange,
  blogTitles,
}: BlogCategoryListProps) => {
  const t = useTranslations('BlogCategoryList');

  const handleFilterClick = useCallback((filterValue: string) => {
    onFilterChange?.(filterValue);
  }, [onFilterChange]);

  const handleTitleClick = useCallback((title: string) => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      const targetElement = findHeadingElement(title);

      if (targetElement) {
        scrollToElement(targetElement);
      }
    }, DOM_RENDER_DELAY);
  }, []);

  const renderFilterItems = () => {
    if (filters && filters.length > 0 && onFilterChange) {
      return filters.map(filter => (
        <CategoryContainer
          key={filter}
          category={filter}
          active={activeFilter === filter}
          onClick={() => handleFilterClick(filter)}
        />
      ));
    }

    return blogTitles?.map((title, index) => (
      <CategoryContainer
        key={`${title}-${index}`}
        category={title}
        onClick={() => handleTitleClick(title)}
      />
    ));
  };

  return (
    <div className="bg-container-gradient rounded-sm border border-border-color py-space-10 md:pb-space-17 md:pt-space-12 px-space-08 relative overflow-hidden h-fit fixed">
      <span className="absolute w-space-60 h-space-150 -top-space-40 right-0 -rotate-55 bg-secondary-blur w-space-50 h-space-50 blur-[100px] opacity-80" />
      <div className="flex flex-col gap-space-08 md:gap-space-15">
        <div className="secondary-content font-bold text-subtle-desc z-10">
          {t('tableOfContents')}
        </div>
        <div className="flex flex-col gap-space-08 z-10">
          {renderFilterItems()}
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryList;
