'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AboutUsError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('About Us page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="About Us Page Error"
      message="We're having trouble loading the about us page. Please try again."
      showRetryButton={true}
    />
  );
}
