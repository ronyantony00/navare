import type { Article, title } from '@/types/insights';
import { useCallback, useEffect, useState } from 'react';
import BlogCategoryList from '@/components/molecules/BlogCategoryList/BlogCategoryList';
import { extractTitlesFromBlog, generateHeadingId, NAVBAR_OFFSET } from '@/utils/scrollspy';
import BlogDataSection from '../BlogDataSection/BlogDataSection';

interface BlogDetailSectionProps {
  blog?: Article;
  blogMainTitle?: title[];
}

const BlogDetailSection = ({ blog, blogMainTitle }: BlogDetailSectionProps) => {
  const [activeTitle, setActiveTitle] = useState<string>('');
  const titles = extractTitlesFromBlog(blog);
  const showTitleList = titles.length > 0;

  const articleMainTitle = blogMainTitle?.map(title => title.text).join(' ');

  const titleId = generateHeadingId(articleMainTitle || '');

  const allTitles = articleMainTitle
    ? [articleMainTitle, ...titles] // puts new title first
    : titles;

  // Scrollspy effect to track which heading is currently in view
  useEffect(() => {
    if (!showTitleList) {
      return;
    }

    const handleScroll = () => {
      const headings = allTitles.map((title: string) => {
        const id = generateHeadingId(title);
        return { title, id, element: document.getElementById(id) };
      }).filter((item: { title: string; id: string; element: HTMLElement | null }) => item.element);

      if (headings.length === 0) {
        return;
      }

      // Find which heading is currently in view
      const scrollPosition = window.scrollY + NAVBAR_OFFSET;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.element && heading.element.offsetTop <= scrollPosition) {
          if (activeTitle !== heading.title) {
            setActiveTitle(heading.title);
          }
          break;
        }
      }
    };

    // Set initial active title
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allTitles, showTitleList, activeTitle]);

  const handleFilterChange = useCallback((filterValue: string) => {
    setActiveTitle(filterValue);
  }, []);

  const renderTableOfContents = () => {
    if (!showTitleList) {
      return null;
    }

    return (
      <div>
        <div className="2md:sticky 2md:top-space-60">
          <BlogCategoryList
            blogTitles={allTitles}
            activeFilter={activeTitle}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-navare-green">
      <div className="relative max-w-maxwidth mx-auto section-padding-x section-padding-y flex flex-col 2md:flex-row gap-space-21">
        {renderTableOfContents()}
        <div className={`${showTitleList ? '2md:w-pct-080' : 'w-full'}`}>
          <BlogDataSection blog={blog} blogTitle={blogMainTitle} titleId={titleId} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSection;
