import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { ContentType } from '@/components/molecules/ContentBlock/Content.Block';
// import Link from 'next/link';
import React from 'react';
import ContentBlock from '@/components/molecules/ContentBlock/Content.Block';
import RichTextRenderer from '@/components/molecules/RichText/RichText';

interface JobDetailSectionProps {
  title?: string;
  content?: string;
  isArray?: boolean;
  linkedInLink?: string;
  easyApplyText?: string;
  clickingHereText?: string;
  richText?: BlocksContent;
  fallback?: string;
}

const JobDetailSection: React.FC<JobDetailSectionProps> = ({
  title,
  content,
  isArray = false,
  // linkedInLink,
  // easyApplyText,
  // clickingHereText,
  richText,
  fallback,
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="very-small-heading font-comme">{title}</div>
      {richText
        ? (
            <RichTextRenderer content={richText} className="primary-content" />
          )
        : (
            <span className="primary-content text-desc-text">{fallback}</span>
          )}
      <div className={`primary-content text-desc-text leading-description${isArray ? ' flex flex-col gap-space-04' : ''}`}>
        {isArray && Array.isArray(content)
          ? (content as ContentType[]).map((c, idx) => (
              <ContentBlock key={idx} content={c} index={idx} />
            ))
          : typeof content === 'string'
            ? <span>{content}</span>
            : null}
        {/* {linkedInLink && easyApplyText && clickingHereText && (
          <div className="primary-content leading-description">
            {easyApplyText}
            <span> </span>
            <Link href={linkedInLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">{clickingHereText}</Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default JobDetailSection;
