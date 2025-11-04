'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ScheduleDemoError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Schedule Demo page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Schedule Demo Page Error"
      message="We're having trouble loading the demo scheduling page. Please try again."
      showRetryButton={true}
    />
  );
}
