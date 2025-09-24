// src\app\[locale]\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Something went wrong"
      message="An unexpected error occurred. Please try again."
      showRetryButton={true}
    />
  );
}
