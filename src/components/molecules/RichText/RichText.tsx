'use client';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { JSX } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { extractTextFromChildren, generateHeadingId, NAVBAR_OFFSET } from '@/utils/scrollspy';

const filterContentForFeatured = (content: BlocksContent): BlocksContent => {
  if (!Array.isArray(content)) {
    return content;
  }

  let paragraphCount = 0;
  const filteredContent: BlocksContent = [];

  for (const block of content) {
    if (block.type === 'paragraph') {
      if (paragraphCount === 0) {
        filteredContent.push(block);
        paragraphCount++;
      }
      continue;
    }
    filteredContent.push(block);
  }

  return filteredContent;
};

interface JobDescriptionRendererProps {
  content?: BlocksContent;
  className?: string;
  variant?: 'default' | 'blog-detail';
  featured?: boolean;
}

const RichTextRenderer: React.FC<JobDescriptionRendererProps> = ({
  content,
  className = 'primary-content',
  featured = false,
  variant = 'default',
}) => {
  if (!content || !Array.isArray(content)) {
    return <div className="text-gray-500">No content available</div>;
  }

  // If featured is true, filter content to only include the first paragraph
  const processedContent = featured ? filterContentForFeatured(content) : content;

  return (
    <div className={`rich-text-content mb-space-10 ${className}`}>
      <BlocksRenderer
        content={processedContent}
        blocks={{
          'heading': ({ children, level }) => {
            const headingStyles: Record<number, string> = {
              1: 'text-size-2xl font-semibold mb-space-10 mt-space-10 gradient-text',
              2: 'text-size-lg font-semibold mb-space-10 mt-space-10 gradient-text',
              3: 'text-size-2sm font-semibold mb-space-10 mt-space-10 leading-description gradient-text',
              4: 'text-size-sm font-medium mb-space-08 mt-space-10 text-primary-content-white',
              5: 'very-small-heading pb-space-05 leading-description text-primary-content-white',
              6: 'text-size-3xs font-medium mb-space-08 mt-space-05 text-desc-text',
            };

            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            const headingText = extractTextFromChildren(children);
            const headingId = generateHeadingId(headingText);

            return React.createElement(
              HeadingTag,
              {
                id: headingId,
                className: headingStyles[level] || headingStyles[1],
                style: {
                  lineHeight: '1.2',
                  scrollMarginTop: `${NAVBAR_OFFSET}px`,
                },
              },
              children,
            );
          },

          'paragraph': ({ children }) => ( // changed to primary content text
            <div className={`primary-content text-desc-text ${variant === 'blog-detail' ? 'mb-space-08 lg:mb-space-15' : ''} ${className}`}>
              {children}
            </div>
          ),

          'list': ({ children, format }) => {
            const listClassName = format === 'ordered'
              ? 'list-decimal list-inside mb-space-05 space-y-space-02 ml-space-10 text-size-2xs'
              : 'mb-space-05 space-y-space-02 text-size-2xs';

            const ListTag = format === 'ordered' ? 'ol' : 'ul';

            return React.createElement(
              ListTag,
              { className: listClassName },
              children,
            );
          },

          'list-item': ({ children }) => (
            <li className="flex items-start gap-space-05 primary-content">
              <span className="bg-primary size-space-03 rotate-45 my-auto"></span>
              <span className="flex-1 text-desc-text primary-content">{children}</span>
            </li>
          ),

          'quote': ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-space-10 py-space-05 mb-space-10 bg-blue-50 italic text-size-2xs">
              {children}
            </blockquote>
          ),

          'code': ({ children }) => (
            <pre className="bg-gray-900 text-green-400 p-space-10 rounded-lg mb-space-10 overflow-x-auto text-size-2xs">
              <code className="text-sm font-mono text-size-2xs">{children}</code>
            </pre>
          ),

          'image': ({ image }) => (
            <div className="mb-space-15 text-size-2xs">
              <Image
                src={image.url}
                alt={image.alternativeText || ''}
                width={image.width}
                height={image.height}
                className="rounded-lg shadow-md max-w-full h-auto"
              />
              {image.caption && (
                <p className="text-sm mt-space-05 text-center italic text-size-2xs">
                  {image.caption}
                </p>
              )}
            </div>
          ),

          'link': ({ children, url }: { children?: React.ReactNode; url: string }) => (
            <Link
              href={url}
              className="text-primary hover:text-plan-card-bar primary-content underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children ?? url}
            </Link>
          ),
        }}
        modifiers={{
          bold: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),

          italic: ({ children }: { children: React.ReactNode }) => (
            <em className="italic">{children}</em>
          ),

          underline: ({ children }: { children: React.ReactNode }) => (
            <u className="underline decoration-2">{children}</u>
          ),

          strikethrough: ({ children }: { children: React.ReactNode }) => (
            <s className="line-through">{children}</s>
          ),

          code: ({ children }: { children: React.ReactNode }) => (
            <code className="bg-gray-100 text-red-600 px-space-05 py-space-05 rounded text-sm text-size-2xs">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
};

export default RichTextRenderer;
