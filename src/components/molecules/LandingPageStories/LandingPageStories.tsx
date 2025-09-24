import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import StoriesCard from '@/components/atoms/StoriesCard/StoriesCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

export interface LandingPageStoriesProps {
  smallText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  stories?: any[];
  classname?: string;
  storyCardVariant?: 'default' | 'blog-detail';
}

const LandingPageStories = ({ smallText, titlePrefix, titleHighlight, stories, classname, storyCardVariant }: LandingPageStoriesProps) => {
  const t = useTranslations('commonMessages');
  return (
    <div className="mx-auto w-full max-w-maxwidth section-padding-y section-padding-x flex flex-col lg:gap-space-27 gap-space-12">
      <Image src={ImageConstants.StoriesNewBg} width={1000} height={1000} alt="stories" className="absolute z-10 top-0 left-0 w-full h-full object-cover" />
      <TextCombo
        smallText={smallText}
        title={titlePrefix}
        spanText={titleHighlight}
        className={`text-center justify-center items-center relative z-20 ${classname}`}
        textClass="sm:max-w-pct-060"
      />
      {stories
        ? (
            <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-space-25 ">
              { stories?.slice(0, 3).map((story: any, idx: number) => (
                <StoriesCard
                  key={idx}
                  title={story.title}
                  description={story.description}
                  date={story.publishedOn || ''}
                  link={`/blog-detail/${story.slug}`}
                  author={story.article_type || 'Blog'}
                  image={story.thumbnail?.url}
                  variant={storyCardVariant || 'default'}
                />
              ))}
            </div>
          )
        : <div className="text-size-sm text-center my-auto text-desc-text w-full">{t('noStoriesFound')}</div>}
    </div>
  );
};

export default LandingPageStories;
