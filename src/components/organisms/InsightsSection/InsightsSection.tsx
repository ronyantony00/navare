'use client';

import type { InsightsPageData, PaginationMeta } from '@/types/apiTypes';
import type { Article } from '@/types/insights';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';
import InsightHeroSection from '@/components/molecules/InsightHeroSection.tsx/InsightHeroSection';
import BlogsSection from '../BlogsSection/BlogsSection';
import NewsSection from '../NewsSection/NewsSection';

interface InsightsSectionProps {
  insightsPageData?: InsightsPageData;
  newsData?: Article[];
  newsMeta?: PaginationMeta;
  blogsData?: Article[];
  blogsMeta?: PaginationMeta;
}

const InsightsSection = ({
  insightsPageData,
  newsData = [],
  newsMeta,
  blogsData = [],
  blogsMeta,
}: InsightsSectionProps) => {
  if (!insightsPageData) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-navare-green w-full">
      <InsightHeroSection
        heroTitle={insightsPageData.title}
        description={insightsPageData.description}
      />
      <NewsSection
        title={insightsPageData.newsListTitle}
        articles={newsData}
        paginationMeta={newsMeta}
      />
      <BlogsSection
        title={insightsPageData.blogSectionTitle}
        tag={insightsPageData.blogSectionTag}
        blogs={blogsData}
        paginationMeta={blogsMeta}
      />
    </div>
  );
};

export default InsightsSection;
