'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UseCasesError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Use Cases page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Use Cases Page Error"
      message="We're having trouble loading the use cases page. Please try again."
      showRetryButton={true}
    />
  );
}
