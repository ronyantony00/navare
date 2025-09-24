// src\components\atoms\ErrorPage\ErrorPage.tsx
import React from 'react';
import Button from '../CustomButton/Button';

interface ErrorPageProps {
  title?: string;
  message?: string;
  showRetryButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = 'Something went wrong',
  message = 'We\'re having trouble loading this page. Please try again later.',
  showRetryButton = true,
}) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-space-10 min-h-screen bg-landing-hero-bg-color">
      <div className="">
        <svg
          className="mx-auto size-space-24 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h1 className="hero-title gradient-text">
        {title}
      </h1>
      <p className="text-desc-text">
        {message}
      </p>
      {showRetryButton && (
        <Button text="Try Again" variant="primary" arrow={true} onClick={handleRetry} mainClass="w-fit mx-auto" arrowClassName="size-space-05" />

      )}
    </div>
  );
};

export default ErrorPage;
