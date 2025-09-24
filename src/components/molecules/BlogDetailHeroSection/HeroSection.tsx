import type { author } from '@/types/insights';
import Image from 'next/image';
import AuthorProfile from '@/components/atoms/AuthorProfile/AuthorProfile';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';
import { formatDateToLongString } from '@/utils/textUtils';

interface HeroSectionProps {
  title: string;
  description: string;
  date: string;
  author?: author;
}

const HeroSection = ({ title, description, date, author }: HeroSectionProps) => {
  return (
    <div className="w-full bg-navare-green relative">
      <Image src={ExternalMediaConstants.BlogDetailHeroImage} alt="Blog Detail Hero Image" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="blog-detail-hero-overlay absolute top-0 left-0 right-0 -bottom-space-05 z-10"></div>
      <div className="w-full max-w-maxwidth mx-auto section-padding-y section-padding-x base:min-h-max-height flex items-center">
        <div className="flex-col z-50">
          {date && (
            <div className="very-small-heading font-bold mb-space-07 text-blue-text flex xl:pl-space-03 gap-space-02">
              <div>{formatDateToLongString(date)}</div>
            </div>
          )}
          <TextCombo
            title={title}
            titleClass="hero-title"
            description={description}
            descClass="primary-content max-w-pct-090 sm:max-w-pct-090 2md:max-w-pct-070"
            className="text-start z-50 xl:max-w-pct-090"
          />
          {author?.name && (
            <AuthorProfile
              avatarUrl={author?.avatar || ''}
              name={author?.name || ''}
              role={author?.role || ''}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
