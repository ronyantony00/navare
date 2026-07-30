'use client';
import type { faqTag } from '@/types/apiTypes';
import type { AnswerBlock, RawFAQItem } from '@/types/commonTypes';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import FaqCard from '@/components/atoms/FaqCard/FaqCard';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqListingSectionProps {
  faqData: RawFAQItem[];
  faqTags: faqTag[];
}

const GnosisFreightFAQ: React.FC<FaqListingSectionProps> = ({ faqData, faqTags }) => {
  // Only show "All" tab if there are FAQs available
  const hasFAQs = faqData && Array.isArray(faqData) && faqData.length > 0;
  const tabs: string[] = hasFAQs ? ['All', ...faqTags.map(tag => tag.tag)] : faqTags.map(tag => tag.tag);

  // Set initial active tab based on available tabs
  const [activeTab, setActiveTab] = useState<string>(hasFAQs ? 'All' : (faqTags.length > 0 ? faqTags[0]?.tag || '' : ''));
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('FaqListingSection');

  useEffect(() => {
    if (openFaqId === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenFaqId(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenFaqId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFaqId]);

  // Function to extract text from Answer blocks
  const extractAnswerText = (answerBlocks: AnswerBlock[]): string => {
    return answerBlocks
      .map(block =>
        block.children
          .map(child => child.text)
          .join(''),
      )
      .join(' ');
  };

  // Transform raw data and filter by active tab
  const currentFAQs = useMemo(() => {
    if (!faqData || !Array.isArray(faqData)) {
      return [];
    }

    return faqData
      .filter((item) => {
        // If "All" is selected and available, show all FAQs without filtering
        if (activeTab === 'All' && hasFAQs) {
          return true;
        }
        // Check if the FAQ has the active tab in its faqTags
        return item.faqTags?.some(tag => tag.tag === activeTab);
      })
      .map(item => ({
        id: item.id,
        question: item.Question,
        answer: extractAnswerText(item.Answer),
      }));
  }, [faqData, activeTab, hasFAQs]);

  return (
    <div className="w-full max-w-maxwidth mx-auto section-padding-x section-padding-y">
      <div className="w-full">
        {/* Tab Navigation */}
        {tabs.length > 0 && (
          <div className="flex flex-wrap gap-space-04 md:gap-space-08 mb-space-16 md:mb-space-30">
            {tabs.map(tab => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-space-05 px-space-07 md:px-space-11 hover:cursor-pointer rounded-full secondary-content font-bold
                  transition-all duration-200 ${activeTab === tab
                ? 'bg-primary text-black'
                : 'text-text-placeholder border border-text-placeholder'
              }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Content */}
        <div ref={containerRef} className="flex flex-col gap-space-12">
          {currentFAQs.map((faq: FAQItem) => (
            <FaqCard
              key={faq.id}
              title={faq.question}
              description={faq.answer}
              isOpen={openFaqId === faq.id}
              onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {currentFAQs.length === 0 && (
          <div className="text-center py-16">
            <div className="primary-content text-subtle-text">
              {t('no_faq_found')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GnosisFreightFAQ;
