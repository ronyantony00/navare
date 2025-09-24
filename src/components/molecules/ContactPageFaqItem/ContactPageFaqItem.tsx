'use client';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import React from 'react';

import RichTextRenderer from '@/components/molecules/RichText/RichText';

interface FaqProps {
  question: string;
  answer: BlocksContent | string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqProps) => {
  return (
    <div className="w-full bg-brand-subtle pt-space-16">
      <button
        type="button"
        className="flex justify-between w-full items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="text-size-sm text-start text-secondary font-semibold">
          {question}
        </div>
        <div
          className={`text-secondary ml-space-10 text-size-md-3 transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-expanded={isOpen}
        >
          +
        </div>
      </button>

      <div className="w-full h-px bg-subtle-border my-4"></div>

      <div
        id={`faq-answer-${question?.replace(/\s+/g, '-') || 'default'}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 pt-space-08 pb-space-16' : 'max-h-space-00 opacity-0 mt-0'
        }`}
      >
        <div className="text-size-4xs text-secondary leading-relaxed">
          {typeof answer === 'string' ? answer : <RichTextRenderer content={answer} />}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
