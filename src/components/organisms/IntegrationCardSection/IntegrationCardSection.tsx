'use client';
import type { PaginationMeta } from '@/types/apiTypes';
import type { CardSectionData } from '@/types/integration';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import SearchBar from '@/components/atoms/SearchBar/SearchBar';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import BlogCategoryList from '@/components/molecules/BlogCategoryList/BlogCategoryList';
import IntegrationGrid from '@/components/organisms/IntegrationGrid/IntegrationGrid';
import { getFilteredIntegrationsDataClientPaginated, getIntegrationsDataClientPaginated, getSearchIntegrationsDataClientPaginated } from '@/services/apiService';

interface IntegrationCardSectionProps extends CardSectionData {
  paginationMeta?: PaginationMeta;
  filters?: string[];
}

const IntegrationCardSection = ({ cardData, error, smallText, textPrefix, textSuffix, paginationMeta, filters }: IntegrationCardSectionProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState(cardData || []);
  const [currentPage, setCurrentPage] = useState<number>(paginationMeta?.page ?? 1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(paginationMeta?.pageCount ?? 1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations('Integration');

  // Check if there are more integrations to load
  const hasMoreIntegrations = currentPage < totalPages;

  const handleFilterChange = useCallback(async (filter: string) => {
    if (filter === activeFilter) {
      return;
    }

    setIsFiltering(true);
    setActiveFilter(filter);
    setCurrentPage(1);
    setSearchQuery(''); // Clear search when filter changes

    try {
      if (filter === 'all') {
        // Fetch all integrations for first page
        const response = await getIntegrationsDataClientPaginated(1, 10);
        setIntegrations(response.data);
        setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      } else {
        // Fetch filtered integrations for first page
        const response = await getFilteredIntegrationsDataClientPaginated(filter, 1, 10);
        setIntegrations(response.data);
        setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      }
    } catch (error) {
      console.error('Error fetching filtered integrations:', error);
      setIntegrations([]);
      setTotalPages(1);
    } finally {
      setIsFiltering(false);
    }
  }, [activeFilter]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      // If search is cleared, revert to current filter
      if (activeFilter === 'all') {
        const response = await getIntegrationsDataClientPaginated(1, 10);
        setIntegrations(response.data);
        setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      } else {
        const response = await getFilteredIntegrationsDataClientPaginated(activeFilter, 1, 10);
        setIntegrations(response.data);
        setTotalPages(response.meta?.pagination?.pageCount ?? 1);
      }
      setCurrentPage(1);
      return;
    }

    // Perform backend search (SearchBar already has 300ms debouncing)
    setIsSearching(true);
    setCurrentPage(1);

    try {
      const response = await getSearchIntegrationsDataClientPaginated(query, 1, 10);
      setIntegrations(response.data);
      setTotalPages(response.meta?.pagination?.pageCount ?? 1);
    } catch (error) {
      console.error('Error searching integrations:', error);
      setIntegrations([]);
      setTotalPages(1);
    } finally {
      setIsSearching(false);
    }
  }, [activeFilter]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMoreIntegrations) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;

      let response;
      if (searchQuery.trim()) {
        // Load more search results
        response = await getSearchIntegrationsDataClientPaginated(searchQuery, nextPage, 10);
      } else if (activeFilter === 'all') {
        // Load more all integrations
        response = await getIntegrationsDataClientPaginated(nextPage, 10);
      } else {
        // Load more filtered integrations
        response = await getFilteredIntegrationsDataClientPaginated(activeFilter, nextPage, 10);
      }

      // Append new integrations to the existing list
      setIntegrations(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);

      // Update total pages from the response metadata
      if (response.meta?.pagination) {
        setTotalPages(response.meta.pagination.pageCount);
      }
    } catch (error) {
      console.error('Error loading more integrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return (
      <div className="max-w-section-max-width section-padding-x section-padding-y mx-auto flex flex-col w-full">
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">{t('Hero.integrations_error')}</div>
          <div className="text-gray-600">{errorMessage}</div>
        </div>
      </div>
    );
  }

  // Show loading state while filtering or searching
  if (isFiltering || isSearching) {
    return (
      <div className="relative max-w-maxwidth mx-auto section-padding-x section-padding-y w-full">
        <div className="flex md:flex-row flex-col gap-space-20 base:gap-space-40 justify-between">
          <div className="flex flex-col gap-space-16 flex-1 w-full md:min-w-space-160 md:sticky md:top-space-60 self-start">
            <SearchBar onSearch={handleSearch} />
            <BlogCategoryList
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              categories={[]}
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-space-06 pb-space-11 border-b border-border-color mb-space-12">
              <TextCombo
                smallText={smallText}
                title={textPrefix}
                spanText={textSuffix}
              />
            </div>
            <div className="w-full h-full py-space-20 text-center">
              <div className="text-size-3xs text-subtle-text">
                {isFiltering ? t('loading') : t('searching') || 'Searching...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!integrations || integrations.length === 0) {
    return (
      <div className="relative max-w-maxwidth mx-auto section-padding-x section-padding-y w-full">
        <div className="flex md:flex-row flex-col gap-space-20 base:gap-space-40 justify-between">
          <div className="flex flex-col gap-space-16 flex-1 w-full md:min-w-space-160 md:sticky md:top-space-60 self-start">
            <SearchBar onSearch={handleSearch} />
            <BlogCategoryList
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              categories={[]}
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-space-06 pb-space-11 border-b border-border-color mb-space-12">
              <TextCombo
                smallText={smallText}
                title={textPrefix}
                spanText={textSuffix}
              />
            </div>
            <div className="w-full h-full py-space-20 text-center">
              <div className="text-size-3xs text-subtle-text">
                {searchQuery.trim()
                  ? t('not_found')
                  : activeFilter === 'all'
                    ? t('no_integrations')
                    : t('not_found')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No need for frontend filtering since search is now backend-based
  const integrationContent = integrations.length > 0
    ? (
        <IntegrationGrid integrations={integrations} />
      )
    : (
        <div className="w-full h-full py-space-20 text-center">
          <div className="text-size-3xs text-subtle-text">{t('not_found')}</div>
        </div>
      );

  return (
    <div className="relative max-w-maxwidth mx-auto section-padding-x section-padding-y w-full">
      <div className="flex md:flex-row flex-col gap-space-20 base:gap-space-40 justify-between">
        <div className="flex flex-col gap-space-16 flex-1 w-full md:min-w-space-160 md:sticky md:top-space-60 self-start">
          <SearchBar onSearch={handleSearch} />
          <BlogCategoryList
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            categories={[]}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-col gap-space-06 pb-space-11 border-b border-border-color mb-space-12">
            <TextCombo
              smallText={smallText}
              title={textPrefix}
              spanText={textSuffix}
            />
          </div>
          <div>
            {integrationContent}
          </div>
          {hasMoreIntegrations && (
            <div className="flex justify-center mt-space-12 md:mt-space-24">
              <Button
                text={isLoading ? t('loading') : t('load_more')}
                variant="primary"
                onClick={handleLoadMore}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationCardSection;
