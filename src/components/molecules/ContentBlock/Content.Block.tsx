import React from 'react';

export type ContentType =
  | { type: string; text?: string; items?: string[]; link?: string };

export interface ContentBlockProps {
  content: ContentType;
  index: number;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ content, index }) => {
  switch (content.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-size-3xs mb-space-08 leading-description">
          {content.text}
          {content.link && (
            <>
              {' '}
              <a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline ml-space-02"
              >
                {content.link}
              </a>
            </>
          )}
        </p>
      );
    case 'bulletList':
      return (
        <div key={index} className="my-space-05">
          {content.items && content.items.map((item: string, itemIndex: number) => (
            <div key={itemIndex} className="flex items-start mb-space-06">
              <span className=" font-bold mr-space-06 ">•</span>
              <span className=" leading-description">{item}</span>
            </div>
          ))}
        </div>
      );
    case 'restrictionList':
      return (
        <div key={index} className="my-space-05">
          {content.items && content.items.map((item: string, itemIndex: number) => (
            <div key={itemIndex} className="flex items-start mb-space-06">
              <span className=" font-bold mr-space-06">•</span>
              <span className=" leading-description">{item}</span>
            </div>
          ))}
        </div>
      );
    case 'subheading':
      return (
        <p key={index} className="my-space-05 mt-space-16 text-size-sm font-semibold">
          {content.text}
        </p>
      );
    default:
      return null;
  }
};

export default ContentBlock;
