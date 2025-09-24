// src\app\[locale]\solutions\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SolutionsError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Solutions page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Solutions Page Error"
      message="We're having trouble loading the solutions page. Please try again."
      showRetryButton={true}
    />
  );
}
