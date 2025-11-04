'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CareersError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Careers page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Careers Page Error"
      message="We're having trouble loading the careers page. Please try again."
      showRetryButton={true}
    />
  );
}
