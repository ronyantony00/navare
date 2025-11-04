'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogDetailError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog detail page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Blog Detail Page Error"
      message="We're having trouble loading the blog article. Please try again."
      showRetryButton={true}
    />
  );
}
