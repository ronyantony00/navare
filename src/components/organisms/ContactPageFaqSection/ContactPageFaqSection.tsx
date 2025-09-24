'use client';
import type { faqType } from '@/types/interfaces';
import { useState } from 'react';
import FaqCard from '@/components/atoms/FaqCard/FaqCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';

interface faqSectionProps {
  data: faqType[];
  titlePrefix?: string;
  titleHighlight?: string;
}

const FaqSection = ({ data, titlePrefix, titleHighlight }: faqSectionProps) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return null;
  }

  const handleToggle = (itemId: number) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  return (
    <div className="max-w-section-max-width mx-auto section-padding-x section-padding-y relative z-50">
      <span className="w-space-75 h-space-75 bg-secondary-blur blur-[100px] opacity-80 absolute top-space-20 left-space-00"></span>
      <div className="flex flex-col gap-space-10">
        <TextCombo
          title={titlePrefix}
          spanText={titleHighlight}
          className="text-center"
          titleClass="section-title"
        />
        <div className="flex flex-col gap-space-08 z-10 mx-auto md:max-w-pct-090 lg:max-w-pct-080 xl:max-w-pct-070">
          {data.map(item => (
            <FaqCard
              key={item.id}
              title={item.Question}
              description={item.Answer}
              isOpen={openItemId === item.id}
              onClick={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
