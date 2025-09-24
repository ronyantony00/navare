'use client';
import type { CareersPageDetails } from '@/types/apiTypes';
import Image from 'next/image';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';

interface CareersSectionProps {
  carerrHeroData: CareersPageDetails;
}

const CareersSection: React.FC<CareersSectionProps> = ({ carerrHeroData }) => {
  const handleScrollToForm = () => {
    const formSection = document.getElementById('career-form-section');
    if (formSection) {
      formSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (!carerrHeroData || !carerrHeroData.page_title) {
    return (
      <ErrorPage
        title="Hero Section Unavailable"
        message="We're having trouble loading the careers hero section."
        showRetryButton={false}
      />
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center h-full base:min-h-max-height justify-center">
      <div className="h-fit w-full max-w-maxwidth flex justify-center items-center section-padding-x section-padding-y">
        <TextCombo
          title={carerrHeroData.page_title}
          description={carerrHeroData.company_intro}
          titleClass="hero-title"
          className="2md:max-w-pct-080 max-w-pct-090 text-center z-10  flex justify-center items-center"
          descClass="primary-content lg:max-w-pct-070 max-w-pct-090 mx-auto"
          buttonOneText={carerrHeroData.buttonText || 'Join Our Team'}
          buttonOneClick={handleScrollToForm}
        />
      </div>
      <Image
        src={ExternalMediaConstants.CareerHeroImage}
        alt="Dashboard Image"
        width={1000}
        height={1000}
        priority
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
    </div>
  );
};

export default CareersSection;
