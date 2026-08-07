'use client';
import type { title } from '@/types/scheduleDemo';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import NotificationPopup from '@/components/atoms/SuccessPopup/SuccessPopup';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import FormComponent from '@/components/molecules/FormComponent/FormComponent';
import { submitDemoBookingFormClient } from '@/services/apiService';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface BookDemoFormProps {
  formSectionDescription?: string;
  formSectionTitle?: title[];
  buttonLabel: string;
  buttonLink: string;
  notificationTimeout?: number;
  policyText?: string;
}

const BookDemoForm = ({
  formSectionDescription,
  formSectionTitle,
  notificationTimeout = 3000,
  policyText,
  buttonLabel,
}: BookDemoFormProps) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(formSectionTitle);
  const t = useTranslations('DemoBookingPage');

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setShowPopup(false); // Reset popup state

    try {
      const formFields = {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        work_email: formData.get('email') as string,
        phone_number: formData.get('number') as string,
        message: formData.get('message') as string,
      };

      // Ensure all required fields are present
      if (!formFields.first_name || !formFields.last_name || !formFields.work_email || !formFields.phone_number || !formFields.message) {
        throw new Error(t('allFieldsRequired'));
      }

      const recaptchaToken = (formData.get('recaptchaToken') as string) ?? '';

      if (!recaptchaToken) {
        throw new Error(t('recaptchaRequired'));
      }

      const response = await submitDemoBookingFormClient(formFields, recaptchaToken);

      console.warn('Demo booking form submission successful:', response);
      setSubmitStatus(true);
      setShowPopup(true);

      // Auto-close popup after notificationTimeout seconds
      setTimeout(() => {
        setShowPopup(false);
        setSubmitStatus(false);
      }, notificationTimeout);
    } catch (error) {
      console.error('Error submitting demo booking form:', error);

      if (error instanceof Error) {
        console.error('Error message:', error.message);
        setError(t('submissionFailed'));
      } else {
        console.error('Unknown error:', error);
        setError(t('submissionFailed'));
      }

      setShowPopup(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-md-3 p-space-10 md:p-space-12 2md:py-space-16 2md:px-space-20 xl:py-space-21 xl:px-space-37
     2md:max-w-space-340 form-bg-gradient border border-navare-green-light relative overflow-hidden"
    >
      <span className="bg-secondary-blur w-space-40 h-space-150 -rotate-45 blur-[100px] absolute bottom-space-50 right-space-00"></span>
      <div className="flex flex-col gap-space-12">
        <div className="flex flex-col">
          <div className="self-center">
            <TextCombo
              title={titlePrefix}
              spanText={titleHighlight}
              extraTitle={titleSuffix}
              titleClass="card-title text-center"
              className="flex mx-auto text-center max-w-pct-090 sm:max-w-full"
            />
          </div>
          <div className="text-size-3xs text-center text-placeholder-text text-subheading">{formSectionDescription}</div>
        </div>
        <FormComponent
          FormButtonText={isLoading ? t('submitting') : buttonLabel || t('bookDemo')}
          fields={['firstName', 'lastName', 'email', 'number', 'message']}
          onSubmit={handleFormSubmit}
          fieldClass="bg-navare-green border rounded-xs"
          firstName="First Name"
        />
      </div>
      <div className="mt-space-08 text-center text-size-4xs">
        <span className="text-desc-text">{policyText || t('formFooterLineOne')}</span>
        <span>
          {' '}
          <Link href="/privacy-policy" className="underline text-primary">{t('formFooterLineTwo')}</Link>
        </span>
      </div>

      {/* Unified Notification Popup - only render when there's an active state */}
      {showPopup && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80">
          <NotificationPopup
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

export default BookDemoForm;
