import { notFound } from 'next/navigation';
import React from 'react';
import TermsOfUse from '@/components/organisms/TermsOfUseSection/TermsOfUseSection';
import { getTermsOfUseDataServer } from '@/services/apiService';

interface PageProps {
  searchParams: Promise<{ slug?: string }>;
}

export const revalidate = 10;

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedSearchParams;

  // Validate that slug is provided
  if (!slug) {
    notFound();
  }

  const response = await getTermsOfUseDataServer(slug);
  const pageDetails = response.data;

  // Check if data exists
  if (!pageDetails || (Array.isArray(pageDetails) && pageDetails.length === 0)) {
    notFound();
  }

  console.warn('pageDetails', pageDetails);
  return (
    <div className="bg-landing-hero-bg-color">
      <TermsOfUse pageDetails={pageDetails} />
    </div>
  );
};

export default page;
