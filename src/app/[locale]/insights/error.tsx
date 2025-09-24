// src\app\[locale]\insights\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function InsightsError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Insights page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Insights Page Error"
      message="We're having trouble loading the insights and articles. Please try again."
      showRetryButton={true}
    />
  );
}
