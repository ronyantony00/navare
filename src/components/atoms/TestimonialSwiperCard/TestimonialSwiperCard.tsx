import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Button from '../CustomButton/Button';

interface TestimonialSwiperCardProps {
  shortTestimonial?: string;
  description?: BlocksContent | string;
  clientName?: string;
  className?: string;
  rating?: number;
  imageUrl?: string;
  companyLogo?: string;
  authorAvatar?: string;
  variant?: 'testimonial' | 'aboutus' | 'usecase';
  title?: string;
  linkText?: string;
  linkUrl?: string;
  headerOnTop?: boolean;
  linkonButton?: boolean;
  titleVariant?: 'small' | 'large';
  showRating?: boolean;
  featured?: boolean;
  slug?: string;
  contentClass?: string;
  authorTitle?: string;
}

const TestimonialSwiperCard = ({ shortTestimonial, clientName, authorTitle, linkonButton = true, contentClass, className = 'service-card-bg', rating, variant = 'testimonial', title, linkUrl, headerOnTop = false, titleVariant = 'small', showRating = false, featured, slug, companyLogo, authorAvatar }: TestimonialSwiperCardProps) => {
  const t = useTranslations('commonMessages');

  return (
    <div className={`${className} relative w-full flex flex-col h-full justify-between grow p-space-15 border overflow-hidden group
    ${variant === 'aboutus' ? 'border-primary' : 'border-border-color'} rounded-lg gap-space-10`}
    >
      {variant === 'usecase'
        ? (
            <div className="absolute w-space-70 h-full right-space-70 -bottom-space-85 rotate-315 rounded-full bg-testimonial-card-blur/60 blur-[100px] pointer-events-none"></div>
          )
        : (
            <div className="absolute w-space-30 h-full right-space-10 -bottom-space-50 rotate-315 rounded-full bg-testimonial-card-blur/50 blur-3xl pointer-events-none"></div>
          )}
      {/* <div className="absolute w-space-30 h-full right-space-10 -bottom-space-50 rotate-315 rounded-full bg-testimonial-card-blur/50 blur-3xl"></div> */}
      {rating !== undefined && rating > 0 && showRating && (
        <div className="flex gap-space-01">
          {Array.from({ length: 5 }, (_, index) => (
            <Image
              key={index}
              src={index < (rating ?? 0) ? ImageConstants.ActiveStar : ImageConstants.InactiveStar}
              alt="Stars"
              width={24}
              height={24}
            />
          ))}
        </div>
      )}
      {title !== undefined && (
        <div className={`text-size-2xs text-primary font-normal text-start ${titleVariant === 'large' ? 'card-title text-subtle-desc' : ''}`}>
          {title}
        </div>
      )}
      <div className={`text-desc-text font-normal break-words relative z-10  ${contentClass} ${featured ? 'line-clamp-6' : ''}`}>
        {shortTestimonial}
      </div>
      {
        linkUrl && (
          <Link href={linkUrl || '#'} className="text-size-4xs text-primary font-normal text-start">
            {t('read_full_review')}
          </Link>
        )
      }
      {slug && !linkUrl && linkonButton && (
        <Button variant="primary" arrow animation text="Read Customer Success Story" arrowClassName="size-space-05" mainClass="gap-space-05 max-w-space-220 mx-auto w-full z-10" wrapText link={`/testimonials/${slug}`} />
      )}
      {slug && !linkUrl && !linkonButton && (
        <Link href={`/testimonials/${slug}`}>
          <div className="flex">
            <div className="self-center text-primary text-size-4xs group-hover:underline">Read Customer Success Story</div>
            <Image
              src={ImageConstants.GreenArrow}
              alt="Arrow Right"
              width={30}
              height={30}
              className="-mb-space-01"
            />
          </div>
        </Link>
      )}
      {clientName && (
        <div className={`${headerOnTop ? 'order-first' : ''}`}>
          <AuthorProfile
            name={clientName}
            role={authorTitle || ''}
            companyLogo={getImageUrl(companyLogo)}
            avatarUrl={getImageUrl(authorAvatar)}
            avatarAlt={clientName}
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialSwiperCard;
