'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/urlConstructor';
import { formatDateToDayMonth } from '@/utils/utilFunctions/dateFormatter';
import VideoComponent from '../VideoComponent/VideoComponent';

interface BlogCardProps {
  date?: string;
  title?: string;
  desc?: string;
  blogImg?: string;
  videoUrl?: string | { url: string };
  link?: string;
}

const NewsCard: React.FC<BlogCardProps> = ({ date, title, desc, videoUrl, link, blogImg }) => {
  // console.warn('videoUrl', videoUrl);
  const t = useTranslations('BlogCard');
  const video = getImageUrl(videoUrl as string);

  const { day, month } = formatDateToDayMonth(date);

  return (
    <Link
      href={link || ''}
      className="size-full bg-blog-card-bg 2md:max-w-space-200 border border-border-light hover:border-primary rounded-lg
      flex flex-col feature-card-bg relative overflow-hidden group cursor-pointer"
    >
      <span className="absolute -right-space-35 -bottom-space-10 w-space-170 h-space-50 bg-secondary-blur rounded-full blur-[70px] opacity-40"></span>
      <div className="relative">
        {videoUrl
          ? (
              <div className="h-space-100 2xs:h-space-150">
                <VideoComponent videoUrl={video} className="h-full" playButtonClass="hidden group-hover:block" />
              </div>
            )
          : (
              blogImg
                ? (
                    <div className="h-space-100 2xs:h-space-150 bg-gray-200 rounded-sm bg-blog-card-bg flex items-center justify-center">
                      <Image src={blogImg} alt="blog-card-image" width={1000} height={1000} className="w-full h-full object-cover" />
                    </div>
                  )
                : (
                    <div className="h-space-100 2xs:h-space-150 stories-card-bg rounded-sm flex items-center justify-center">
                      <span className="text-desc-text">{title}</span>
                    </div>
                  )
            )}
      </div>
      <div className={`${link && 'group-hover:pt-space-06'} pt-space-12 pb-space-13 px-space-13 flex flex-col z-10 h-space-100`}>
        <div className="flex gap-space-12 mb-space-06">
          <div className="w-space-25 h-space-25 impact-card-bg px-space-06 py-space-02 self-center
              rounded-sm text-size-4xs leading-sm font-normal text-primary
              flex flex-col items-center justify-center border-hairline"
          >
            <div className="leading-none">{day}</div>
            <div className="leading-none">{month}</div>
          </div>
          <div className=" text-subtle-desc line-clamp-2 small-card-heading">{title}</div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 justify-center">
            <div className="line-clamp-2 small-content text-subtle-text">{desc}</div>
          </div>
          {link && (
            <div className="hidden group-hover:flex mt-space-03 cursor-pointer">
              <div className="button-text text-primary group-hover:underline flex items-center">{t('learn_more')}</div>
              <Image src={ImageConstants.blogCardLinkArrow} alt="blog-card-link-arrow" width={38} height={38} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
