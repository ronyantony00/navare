// src\app\[locale]\legal\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LegalError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Legal page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Legal Page Error"
      message="We're having trouble loading the legal page. Please try again."
      showRetryButton={true}
    />
  );
}
