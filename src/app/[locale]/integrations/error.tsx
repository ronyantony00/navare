'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function IntegrationsError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Integrations page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Integrations Page Error"
      message="We're having trouble loading the integrations page. Please try again."
      showRetryButton={true}
    />
  );
}
