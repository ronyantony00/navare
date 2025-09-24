import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';

const LandingPageImpact = () => {
  return (
    <div className="w-full flex flex-col items-start gap-space-30 md:py-space-30 py-space-20">
      <TextCombo
        smallText="Our Impact"
        title="Quantifiable Success That Speaks for"
        spanText="Itself ."
        className="items-start max-w-pct-070 gap-space-10"
        spanClass="text-primary"
        titleClass="font-medium md:text-size-3xl-3 text-size-xl leading-sub-title gradient-text"
      />
    </div>
  );
};

export default LandingPageImpact;
