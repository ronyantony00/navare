'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function WebsiteTermsOfUseError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Website terms of use page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Terms of Use Page Error"
      message="We're having trouble loading the terms of use page. Please try again."
      showRetryButton={true}
    />
  );
}
