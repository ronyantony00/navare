import type { Article } from '@/types/insights';
import type { title } from '@/types/usecase';
import NewsListComponent from '@/components/atoms/NewsListComponent/NewsListComponent';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface NewsListProps {
  title?: title[];
  newsList?: Article[];
}

const NewsList = ({ title, newsList }: NewsListProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);

  return (
    <div className="flex flex-col">
      <TextCombo
        title={(titlePrefix || '').toUpperCase()}
        spanText={(titleHighlight || '').toUpperCase()}
        extraTitle={titleSuffix || ''}
        titleClass="section-title"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 2md:grid-cols-1 gap-space-08">
        {newsList?.slice(0, 4).map(news => (
          <NewsListComponent
            key={news.id}
            date={news.publishedOn}
            title={news.title}
            description={news.description}
            slug={news.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
