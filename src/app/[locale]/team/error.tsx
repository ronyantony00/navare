// src\app\[locale]\team\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TeamError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Team page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Team Page Error"
      message="We're having trouble loading the team page. Please try again."
      showRetryButton={true}
    />
  );
}
