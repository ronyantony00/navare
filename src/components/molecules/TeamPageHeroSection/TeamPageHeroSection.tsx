import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';

interface TeamPageHeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
}
const TeamPageHeroSection = ({ title, description, buttonText }: TeamPageHeroSectionProps) => {
  return (
    <div className="z-50 w-full max-w-maxwidth flex flex-col items-center justify-center gap-space-30 base:min-h-max-height section-padding-x section-padding-y">
      <TextCombo
        title={title}
        description={description}
        className="xl:max-w-pct-080 items-center text-center"
        descClass="max-w-pct-090 md:max-w-pct-080 2md:max-w-pct-070"
        titleClass="hero-title"
        buttonOneText={buttonText}
        buttonOneLink="/careers"
      />
    </div>
  );
};

export default TeamPageHeroSection;
