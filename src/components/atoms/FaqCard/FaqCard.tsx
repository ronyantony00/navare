'use client';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import React from 'react';

interface FaqCardProps {
  title: string;
  description: string | BlocksContent;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ title, description, isOpen, onClick }) => (
  <div className="w-full h-fit rounded-md bg-container-gradient hover:shadow-lg border border-green-secondary">
    <div className="overflow-hidden rounded-lg ">
      <button
        type="button"
        onClick={onClick}
        className="flex gap-space-15 w-full items-center justify-between px-space-10 md:px-space-20 py-space-14 text-left hover:cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="small-card-heading text-subtle-desc">
          {title}
        </div>
        <div className={`${isOpen ? 'text-size-2lg' : 'text-size-2sm font-medium'} leading-relaxed font-normal text-primary`}>{isOpen ? '-' : '+'}</div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out px-space-10 md:px-space-20 overflow-hidden ${isOpen ? 'h-auto opacity-100 pb-space-14' : 'max-h-0 opacity-0'}`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        <div className="primary-content text-desc-text">
          {typeof description === 'string' ? description : <BlocksRenderer content={description} />}
        </div>
      </div>
    </div>
  </div>
);

export default FaqCard;
