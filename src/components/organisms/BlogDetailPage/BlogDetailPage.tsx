'use client';

import type { Article, title } from '@/types/insights';
import { useTranslations } from 'next-intl';
import HeroSection from '@/components/molecules/BlogDetailHeroSection/HeroSection';
import LandingPageStories from '@/components/molecules/LandingPageStories/LandingPageStories';
import BlogDetailSection from '../BlogDetailSection/BlogDetailSection';

interface BlogDetailPageProps {
  blog?: Article;
  articles?: Article[];
  blogMainTitle?: title[];
}

const DetailPage = ({ blog, articles, blogMainTitle }: BlogDetailPageProps) => {
  const t = useTranslations('BlogDetailPage.landingPageStories');
  return (
    <div className="w-full flex flex-col">
      <HeroSection
        title={blog?.title || ''}
        description={blog?.description || ''}
        date={blog?.publishedOn || ''}
        author={typeof blog?.author === 'object' ? blog.author : undefined}
      />
      <BlogDetailSection
        blog={blog}
        blogMainTitle={blogMainTitle}
      />
      <div className="relative">
        <LandingPageStories
          smallText={t('smallText')}
          titlePrefix={t('titlePrefix')}
          titleHighlight={t('titleHighlight')}
          classname="max-w-pct-080 mx-auto"
          stories={articles || []}
          storyCardVariant="blog-detail"
        />
      </div>
    </div>
  );
};

export default DetailPage;
