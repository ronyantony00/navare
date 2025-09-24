// src\app\[locale]\faq\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FaqError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('FAQ page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="FAQ Page Error"
      message="We're having trouble loading the frequently asked questions. Please try again."
      showRetryButton={true}
    />
  );
}
