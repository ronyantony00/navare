'use client';

import type { PaginationMeta } from '@/types/apiTypes';
import type { Article } from '@/types/insights';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import BlogCard from '@/components/atoms/BlogCard/BlogCard';
import Button from '@/components/atoms/CustomButton/Button';
import { getBlogsDataClientPaginated } from '@/services/apiService';

interface InsightsBlogsListingProps {
  blogs: Article[];
  paginationMeta?: PaginationMeta;
}

const BLOGS_PER_PAGE = 6;

const InsightsBlogsListing = ({ blogs: initialBlogs, paginationMeta }: InsightsBlogsListingProps) => {
  const t = useTranslations('articlespage');
  const [blogs, setBlogs] = useState<Article[]>(initialBlogs);
  const [currentPage, setCurrentPage] = useState<number>(paginationMeta?.page ?? 1);
  const [isLoading, setIsLoading] = useState(false);

  // Use server pagination data if available, otherwise fall back to client-side calculation
  const serverTotalPages = paginationMeta?.pageCount;

  // Filter out empty/placeholder blogs
  const validBlogs = blogs.filter(blog => blog && blog.id && blog.title);

  // Determine total pages: use server data if available, otherwise calculate from current blogs
  const totalPages = serverTotalPages ?? Math.ceil(validBlogs.length / BLOGS_PER_PAGE);

  // Check if there are more blogs to load
  const hasMoreBlogs = currentPage < totalPages;

  const handleLoadMore = async () => {
    if (isLoading || !hasMoreBlogs) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await getBlogsDataClientPaginated(nextPage, BLOGS_PER_PAGE);

      // Append new blogs to the existing list
      setBlogs(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!validBlogs || validBlogs.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="text-size-sm font-medium text-default text-center">{t('no_blogs')}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Blogs Cards Grid */}
      <div className="grid grid-cols-1 2md:grid-cols-2 gap-space-12">
        {validBlogs.map((blog, index) => (
          <BlogCard
            key={blog.id || `blog-${index}`}
            title={blog.title}
            desc={blog.description}
            link={`/blog-detail/${blog.slug}`}
            backgroundImage={blog?.blogCardBackgroundImage?.url}
            date={blog.publishedOn}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreBlogs && (
        <div className="w-full flex justify-center mt-space-15 lg:mt-space-25">
          <Button
            text={isLoading ? t('loading') : t('load_more')}
            variant="primary"
            animation={true}
            arrowClassName="size-space-05"
            mainClass="w-space-71"
            onClick={handleLoadMore}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default InsightsBlogsListing;
