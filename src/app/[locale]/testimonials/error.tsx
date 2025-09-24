// src\app\[locale]\testimonials\error.tsx
'use client';
import React from 'react';
import ErrorPage from '@/components/atoms/ErrorPage/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TestimonialsError({ error, reset: _reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Testimonials page error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Testimonials Page Error"
      message="We're having trouble loading the testimonials page. Please try again."
      showRetryButton={true}
    />
  );
}
