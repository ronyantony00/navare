'use client';

import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PrivacyPolicyError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Privacy Policy page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Privacy Policy Page Error"
      message="We're having trouble loading the privacy policy. Please try again."
      showRetryButton={true}
    />
  );
}
