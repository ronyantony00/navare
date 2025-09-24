/**
 * Custom hook for demo booking form state management and submission logic
 */
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/constants/apiConstants/apiEndpoints';
import { useFetch } from '@/hooks/useFetch';

export interface UseBookDemoFormReturn {
  isLoading: boolean;
  submitStatus: boolean;
  hasError: boolean;
  handleFormSubmit: (formData: FormData) => void;
}

export const useBookDemoForm = (notificationTimeout: number = 3000): UseBookDemoFormReturn => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [formPayload, setFormPayload] = useState<{
    first_name: string;
    last_name: string;
    work_email: string;
    phone_number: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    error: fetchError,
    loading: fetchLoading,
  } = useFetch(
    API_ENDPOINTS.SCHEDULE_DEMO_FORM,
    formPayload
      ? {
          method: 'POST',
          body: JSON.stringify({ data: formPayload }),
        }
      : undefined,
    Boolean(formPayload),
  );

  useEffect(() => {
    if (!formPayload) {
      return;
    }

    if (!fetchLoading && !fetchError) {
      setSubmitStatus(true);
      setFormPayload(null);
      setTimeout(() => setSubmitStatus(false), notificationTimeout);
    }

    if (fetchError) {
      setError('Error submitting form');
      console.error('Error submitting demo booking form:', fetchError);
    }
  }, [fetchLoading, fetchError, formPayload, notificationTimeout]);

  const handleFormSubmit = (formData: FormData) => {
    const formFields = {
      first_name: (formData.get('firstName') as string) ?? '',
      last_name: (formData.get('lastName') as string) ?? '',
      work_email: (formData.get('email') as string) ?? '',
      phone_number: (formData.get('number') as string) ?? '',
      message: (formData.get('message') as string) ?? '',
    };

    if (!formFields.first_name || !formFields.last_name || !formFields.work_email || !formFields.phone_number || !formFields.message) {
      console.error('All fields are required');
      return;
    }

    setFormPayload(formFields);
  };

  return {
    isLoading: fetchLoading,
    submitStatus,
    hasError: Boolean(fetchError || error),
    handleFormSubmit,
  };
};
