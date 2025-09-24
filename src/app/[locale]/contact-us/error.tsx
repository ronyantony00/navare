// src\app\[locale]\contact-us\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ContactUsError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Contact Us page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Contact Us Page Error"
      message="We're having trouble loading the contact us page. Please try again."
      showRetryButton={true}
    />
  );
}
