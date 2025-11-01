'use client';
import type { title } from '@/types/usecase';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';
import SuccessPopup from '@/components/atoms/SuccessPopup/SuccessPopup';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import FormComponent from '@/components/molecules/FormComponent/FormComponent';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';
import { submitCareerFormClient } from '@/services/apiService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface CareerFormProps {
  onNotify?: (message: string) => void;
  title?: title[];
  description?: string;
}

const CareerForm: React.FC<CareerFormProps> = ({ title, description }) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations('CareerForm');

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setShowPopup(false); // Reset popup state

    try {
      const formFields = {
        name: (formData.get('firstName') as string) ?? '',
        email: (formData.get('email') as string) ?? '',
        message: (formData.get('message') as string) ?? '',
      };

      // Ensure all required fields are present (message is optional)
      if (!formFields.name || !formFields.email) {
        throw new Error('All fields are required');
      }

      // Submit form using the new client-side API function
      const response = await submitCareerFormClient(formFields);

      console.warn('Career form submission successful:', response);
      setSubmitStatus(true);
      setShowPopup(true);

      // Auto-close popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
        setSubmitStatus(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting career form:', error);

      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        setError('Error submitting form');
      } else {
        console.error('Unknown error:', error);
        setError('Error submitting form');
      }

      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="section-padding-y section-padding-x w-full max-w-maxwidth flex items-center justify-center">
      <div className="relative border border-border-color grid grid-cols-1 lg:grid-cols-2 gap-space-15 items-start rounded-lg lg:py-space-23 lg:pl-space-40 lg:pr-space-30 md:py-space-16 md:px-space-25 py-space-15 px-space-10">
        <TextCombo
          title={titlePrefix}
          spanText={titleHighlight}
          breakText={<br />}
          description={description}
          extraTitle={titleSuffix}
          titleClass="section-title"
          textClass=" mx-auto lg:max-w-pct-080 lg:mx-space-00"
          descClass="primary-content"
          className="items-start justify-center gap-space-05 z-10 text-center lg:text-left"
        />
        <div className="w-full rounded-md-3 z-10">
          <FormComponent
            onSubmit={handleFormSubmit}
            className="flex flex-col z-10"
            firstName="Name"
            fields={['firstName', 'email', 'message']}
            FormButtonText={isLoading ? t('submittingText') : t('sendMessageText')}
            fieldClass="stories-card-bg rounded-md"
          />
        </div>
        <Image
          src={ExternalMediaConstants.CareerFormBackgroundImage}
          alt="Career Form Background"
          width={500}
          height={500}
          className="absolute top-0 right-0 object-cover h-full w-full rounded-lg"
        />
      </div>

      {/* Unified Notification Popup - only render when there's an active state */}
      {showPopup && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80">
          <SuccessPopup
            isLoading={isLoading}
            submitStatus={submitStatus}
            error={error}
            setError={setError}
            setShowPopup={setShowPopup}
          />
        </div>
      )}
    </div>
  );
};

export default CareerForm;
