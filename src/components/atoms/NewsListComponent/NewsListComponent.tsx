import Link from 'next/link';
import { formatDateToDayMonth } from '@/utils/utilFunctions/dateFormatter';

interface NewsListComponentProps {
  title: string;
  description: string;
  date: string;
  slug?: string;
}

const NewsListComponent = ({ title, description, date, slug }: NewsListComponentProps) => {
  const { day, month } = formatDateToDayMonth(date);

  return (
    <Link href={`/blog-detail/${slug}`} className="flex gap-space-12 py-space-05 px-space-04 border border-border-light rounded-xs-2 w-full 2md:max-w-space-200">
      <div className="form-bg-gradient px-space-06 sm:px-space-08 py-space-05
            rounded-sm border-hairline text-size-4xs leading-sm font-normal text-primary
            flex flex-col items-center justify-center"
      >
        <div className="leading-none">{day}</div>
        <div className="leading-none">{month}</div>
      </div>
      <div className="flex flex-col gap-space-04">
        <div className="very-small-heading text-subtle-text">
          <div className="line-clamp-1">
            {title}
          </div>
        </div>
        <div className="small-content text-text-placeholder line-clamp-1">
          {description}
        </div>
      </div>
    </Link>
  );
};

export default NewsListComponent;
