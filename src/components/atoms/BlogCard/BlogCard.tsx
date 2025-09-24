import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/urlConstructor';

interface BlogCardProps {
  date?: string;
  title?: string;
  desc?: string;
  backgroundImage?: string;
  link?: string;
}

const BlogCard = ({ date, title, desc, backgroundImage, link }: BlogCardProps) => {
  const imageUrl = getImageUrl(backgroundImage as string);
  return (
    <Link href={link || '/insights'} className="w-full 2md:max-w-space-315 2xs:h-space-200 2md:h-space-300 lg:h-space-250 xl:h-space-225 rounded-lg border border-border-color overflow-hidden relative cursor-pointer group">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl || ImageConstants.BlogCardImage}
          alt={title || 'Blog image'}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 impact-card-bg opacity-60"></div>
      <div className=" relative 2xs:absolute 2xs:bottom-0 z-10 p-space-10 2xs:py-space-00 2xs:px-space-17 xl:px-space-27 2xs:group-hover:top-1/2 2xs:group-hover:-translate-y-1/2 2xs:group-hover:bottom-auto transition-all duration-300 ease-in-out z-20">
        <div className="px-space-07 md:px-space-17 py-space-10 md:py-space-15 rounded-sm 2xs:rounded-t-sm 2xs:rounded-b-none group-hover:rounded-sm bg-subtle-desc text-black flex flex-col">
          <div className="card-title font-medium line-clamp-3">{title}</div>
          <div className="secondary-content mt-space-12 line-clamp-5">{desc}</div>
          <div className="flex justify-between mt-space-10 md:mt-space-16 h-space-15">
            <div className="very-small-heading text-border-light font-bold">{date}</div>
            <div className="hidden group-hover:block">
              <Image src={ImageConstants.blogCardLinkArrow} alt="blog-card-link-arrow" width={38} height={38} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

// relative -bottom-space-05 hover:bottom-space-10 group
