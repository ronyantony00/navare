import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import TextCombo from '../TextCombo/TextCombo';

export interface StoriesCardProps {
  title?: string;
  description?: string;
  date?: string;
  link?: string;
  author?: string;
  image?: any;
  variant?: 'default' | 'blog-detail';
}

const StoriesCard = ({ title, description, date, link, author, image }: StoriesCardProps) => {
  const t = useTranslations('commonMessages');
  return (
    <div className="relative w-full flex flex-col rounded-lg stories-card-bg border border-border-color overflow-hidden group hover:border-primary">
      <div className="absolute w-space-30 h-full left-pct-080 -bottom-pct-050 rotate-315 rounded-full bg-testimonial-card-blur opacity-50 blur-3xl"></div>
      {image
        ? (
            <Image
              src={getImageUrl(image)}
              alt="Stories"
              width={1000}
              height={1000}
              className="w-full object-cover rounded-lg h-space-150"
            />
          )
        : (
            <div className="w-full h-space-150 bg-white rounded-lg flex items-center justify-center">
              <TextCombo title="ARTICLE | NAVARE" titleClass="primary-content" />
            </div>
          )}
      <div className="flex flex-col gap-space-05 p-space-12 flex-1">
        <div className="sm:text-size-sm text-size-2xs font-bold text-white">
          {title}
        </div>
        <div className="text-size-4xs text-desc-text line-clamp-6">
          {description}
        </div>
        <div className="mt-auto">
          <div className="text-size-4xs text-primary flex gap-space-05 items-center mt-space-04 md:mt-space-09">
            {author && `${author}`}
            <div className="size-space-03 bg-primary rounded-full my-auto">
            </div>
            {date}
          </div>
          <Link href={link || '#'}>
            <div className="flex gap-space-02 mt-space-04 md:mt-space-09">
              <div className="self-center text-primary button-text group-hover:underline">{t('learn_more')}</div>
              <Image
                src={ImageConstants.GreenArrow}
                alt="Arrow Right"
                width={30}
                height={30}
                className="-mb-space-01"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoriesCard;
