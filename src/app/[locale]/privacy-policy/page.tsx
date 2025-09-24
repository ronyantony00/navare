import React from 'react';
import PrivacyPolicySection from '@/components/organisms/PrivacyPolicySection/PrivacyPolicySection';

export const revalidate = 10;

const page = () => {
  return (
    <div className="bg-landing-hero-bg-color">
      <PrivacyPolicySection />
    </div>
  );
};

export default page;
