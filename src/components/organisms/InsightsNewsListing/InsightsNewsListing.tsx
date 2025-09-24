'use client';
import type { PaginationMeta } from '@/types/apiTypes';
import type { Article } from '@/types/insights';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import NewsCard from '@/components/atoms/NewsCard/NewsCard';
import { getNewsDataClientPaginated } from '@/services/apiService';

interface InsightsNewsListingProps {
  articles: Article[];
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
}

const ARTICLES_PER_PAGE = 4;

const InsightsNewsListing = ({
  articles: initialArticles,
  paginationMeta,
  onPageChange,
}: InsightsNewsListingProps) => {
  const t = useTranslations('articlespage');
  const [allArticles, setAllArticles] = useState<Article[]>(initialArticles);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Use server pagination data if available, otherwise fall back to client-side calculation
  const serverTotalPages = paginationMeta?.pageCount;

  // Filter out invalid articles
  const validArticles = allArticles.filter(article =>
    article && article.id && article.title,
  );

  // Determine total pages: use server data if available, otherwise calculate from current articles
  const totalPages = serverTotalPages ?? Math.ceil(validArticles.length / ARTICLES_PER_PAGE);

  // Get current page articles (only 4 cards per page)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentPageArticles = validArticles.slice(startIndex, endIndex);

  // Notify parent component when page changes
  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  // Pagination buttons logic - Show max 2 numbered buttons
  const paginationButtons = useMemo(() => {
    const buttons: Array<{
      type: 'number' | 'next' | 'prev';
      page: number;
      isActive: boolean;
      label: string;
    }> = [];

    // No pagination needed if only 1 page or no pages
    if (totalPages <= 1) {
      return buttons;
    }

    // Add Previous button if not on first page
    if (currentPage > 1) {
      buttons.push({
        type: 'prev',
        page: currentPage - 1,
        isActive: false,
        label: 'Previous',
      });
    }

    // Add numbered buttons - Show max 2 buttons
    if (totalPages <= 2) {
      // If 2 or fewer pages, show all numbered buttons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push({
          type: 'number',
          page: i,
          isActive: currentPage === i,
          label: String(i),
        });
      }
    } else {
      // If more than 2 pages, show only 2 numbered buttons
      if (currentPage === 1) {
        // First page: show [1, 2]
        buttons.push(
          { type: 'number', page: 1, isActive: true, label: '1' },
          { type: 'number', page: 2, isActive: false, label: '2' },
        );
      } else if (currentPage === totalPages) {
        // Last page: show [prev, current]
        buttons.push(
          { type: 'number', page: currentPage - 1, isActive: false, label: String(currentPage - 1) },
          { type: 'number', page: currentPage, isActive: true, label: String(currentPage) },
        );
      } else {
        // Middle pages: show [current, next]
        buttons.push(
          { type: 'number', page: currentPage, isActive: true, label: String(currentPage) },
          { type: 'number', page: currentPage + 1, isActive: false, label: String(currentPage + 1) },
        );
      }
    }

    // Add Next button if not on last page
    if (currentPage < totalPages) {
      buttons.push({
        type: 'next',
        page: currentPage + 1,
        isActive: false,
        label: t('next'),
      });
    }

    return buttons;
  }, [currentPage, totalPages, t]);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber === currentPage || isLoading || pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setIsLoading(true);

    try {
      // Check if we need to fetch more data from the server
      const articlesNeeded = pageNumber * ARTICLES_PER_PAGE;
      const currentArticlesCount = allArticles.length;

      if (articlesNeeded > currentArticlesCount) {
        // Calculate how many more articles we need to fetch
        const nextPageToFetch = Math.ceil(currentArticlesCount / ARTICLES_PER_PAGE) + 1;

        const response = await getNewsDataClientPaginated(nextPageToFetch, ARTICLES_PER_PAGE);

        if (response?.data) {
          // Add new articles to the existing array
          setAllArticles(prev => [...prev, ...response.data]);
        }
      }

      setCurrentPage(pageNumber);
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle empty state
  if (!validArticles || validArticles.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="text-size-sm font-medium text-default text-center">
          {t('no_news')}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full 2md:max-w-space-425">
      {/* News Cards Grid - Shows only current page articles (4 cards) */}
      <div className="flex flex-col">
        <div className="grid grid-rows-1 grid-cols-1 2md:grid-cols-2 items-center justify-center gap-space-17 xl:gap-x-space-27 gap-y-space-17">
          {currentPageArticles.map((article, index) => (
            <NewsCard
              key={article.id || `article-${startIndex + index}`}
              date={article.publishedOn}
              title={article.title}
              desc={article.description}
              link={`/blog-detail/${article.slug}`}
              videoUrl={article.newsThumpnailVideo?.url}
              blogImg={article?.thumbnail?.url}
            />
          ))}
        </div>
      </div>

      {/* Pagination Buttons - Show only when there are multiple pages */}
      {paginationButtons.length > 0 && (
        <div className="flex justify-center items-center mt-space-15 lg:mt-space-25">
          {paginationButtons.map((button, index) => (
            <Button
              key={`${button.type}-${button.page}-${index}`}
              onClick={() => handlePageChange(button.page)}
              disabled={isLoading}
              mainClass={`
                ${button.isActive
              ? 'bg-primary text-black'
              : 'pagination-btn-bg text-subtle-desc'
            }
                border border-border-color
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${button.type === 'next' || button.type === 'prev' ? ' sm:min-w-space-50' : ''}
              `}
              text={button.label}
              variant="pagination"
              animation={true}
              arrowClassName="size-space-05"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightsNewsListing;
