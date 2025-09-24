'use client';

import type { PaginationMeta } from '@/types/apiTypes';
import type { Article } from '@/types/insights';
import type { title as Title } from '@/types/usecase';
import { useTranslations } from 'next-intl';
import NewsList from '@/components/molecules/NewsList/NewsList';
import InsightsNewsListing from '../InsightsNewsListing/InsightsNewsListing';

interface InsightsBlogListingProps {
  title?: Title[];
  articles: Article[];
  paginationMeta?: PaginationMeta;
}

const NewsSection = ({ title, articles, paginationMeta }: InsightsBlogListingProps) => {
  const t = useTranslations('articlespage');
  if (articles.length === 0 || !articles) {
    return (
      <div className="py-space-28">
        <div className="text-centert small-card-heading text-text-placeholder">{t('no_news_found')}</div>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    console.warn('Page changed to:', page);
  };

  return (
    <div className="w-full max-w-maxwidth mx-auto section-padding-y section-padding-x">
      <div className="relative flex 2md:flex-row flex-col items-start justify-start gap-space-24 2md:gap-space-20">
        <InsightsNewsListing
          articles={articles}
          paginationMeta={paginationMeta}
          onPageChange={handlePageChange}
        />
        <div className="2md:sticky 2md:top-space-100 z-10">
          <NewsList
            title={title}
            newsList={articles}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
