import React from 'react';
import InsightsSection from '@/components/organisms/InsightsSection/InsightsSection';
import { getBlogsDataServer, getInsightsPageDataServer, getNewsDataServer } from '@/services/apiService';

export const revalidate = 10;

const page = async () => {
  const [insightsPageResponse, newsResponse, blogsResponse] = await Promise.all([
    getInsightsPageDataServer(),
    getNewsDataServer(1, 4),
    getBlogsDataServer(1, 6),
  ]);

  const { data: insightsPageData } = insightsPageResponse;
  const { data: newsData, meta: newsMeta } = newsResponse;
  const { data: blogsData, meta: blogsMeta } = blogsResponse;

  return (
    <div className="bg-breadcrumb-nav-bg w-full flex flex-col items-center">
      <InsightsSection
        insightsPageData={insightsPageData}
        newsData={newsData}
        newsMeta={newsMeta?.pagination}
        blogsData={blogsData}
        blogsMeta={blogsMeta?.pagination}
      />
    </div>
  );
};

export default page;
