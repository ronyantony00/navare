import type { PaginationMeta } from '@/types/apiTypes';
import type { Article } from '@/types/insights';
import type { title } from '@/types/usecase';
import { useTranslations } from 'next-intl';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import InsightsBlogsListing from '../InsightsBlogsListing/InsightsBlogsListing';

interface BlogsSectionProps {
  title?: title[];
  tag?: string;
  blogs: Article[];
  error?: string;
  paginationMeta?: PaginationMeta;
}

const BlogsSection = ({ title, tag, blogs, error, paginationMeta }: BlogsSectionProps) => {
  const t = useTranslations('articlespage');

  console.warn('ARTCLE OR BLOGS', blogs);

  if (!blogs || blogs.length === 0 || error) {
    return (
      <div className="py-space-28">
        <div className="text-centert small-card-heading text-text-placeholder">{t('no_blogs_found')}</div>
      </div>
    );
  }

  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="w-full max-w-maxwidth mx-auto section-padding-x section-padding-y">
      <div className="flex flex-col">
        <div className="flex flex-col gap-space-06 mb-space-08 lg:mb-space-28">
          <div className="text-size-3xs font-bold leading-relaxed text-primary text-center">{tag}</div>
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            extraTitle={titleSuffix}
            className="text-center"
          />
        </div>
        <InsightsBlogsListing
          blogs={blogs}
          paginationMeta={paginationMeta}
        />
      </div>
    </div>
  );
};

export default BlogsSection;
