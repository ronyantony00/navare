'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import NotificationPopup from '@/components/atoms/SuccessPopup/SuccessPopup';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import FormComponent from '@/components/molecules/FormComponent/FormComponent';
import { submitContactFormClient } from '@/services/apiService';

interface contactSectionProps {
  title?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  bannerText?: string;
  buttonText?: string;
}

const ContactSection = ({ title, description, bannerText, buttonText }: contactSectionProps) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations('ContactUsNew');

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setShowPopup(false); // Reset popup state

    try {
      const formFields = {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('number') as string,
        message: formData.get('message') as string,
        privacy_policy_accepted: true, // Default to true since it's required by API
        contact_request_status: 'new',
        submitted_at: new Date().toISOString(),
      };

      // Ensure all required fields are present
      if (!formFields.first_name || !formFields.last_name || !formFields.email || !formFields.phone) {
        throw new Error(t('allFieldsRequired'));
      }

      const recaptchaToken = (formData.get('recaptchaToken') as string) ?? '';

      if (!recaptchaToken) {
        throw new Error(t('recaptchaRequired'));
      }

      // Submit form to Strapi
      const response = await submitContactFormClient(formFields, recaptchaToken);

      console.warn('Contact form submission successful:', response);
      setSubmitStatus(true);
      setShowPopup(true);

      // Auto-close popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
        setSubmitStatus(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);

      // More detailed error logging
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
    <div className="border-b border-border-light w-full">
      <div className="max-w-maxwidth mx-auto section-padding-x" aria-labelledby="contact-heading">
        <div className="section-padding-y xl:border-x xl:border-border-light relative">
          <TextCombo
            smallText={bannerText}
            title={title}
            description={description}
            className="text-center max-w-pct-085 mx-auto"
            titleClass="hero-title"
            descClass="primary-content 2md:max-w-pct-065 mx-auto"
          />
          <div className="flex flex-col px-space-10 sm:px-space-15 md:px-space-25 2md:px-space-40 pt-space-20 pb-space-20 md:pt-space-35 md:pb-space-35 rounded-md-2
          max-w-space-495 w-full mx-auto mt-space-12 md:mt-space-24 border border-border-light relative overflow-hidden"
          >
            <span className="absolute top-space-89 w-space-325 h-space-100 left-space-106 bg-primary-blur rounded-full blur-[100px] opacity-80"></span>
            <FormComponent
              fields={['firstName', 'lastName', 'email', 'number', 'message']}
              FormButtonText={isLoading ? t('submittingText') : buttonText || t('sendMessageText')}
              onSubmit={handleFormSubmit}
              emailFieldClass="col-span-2 sm:col-span-1"
              phoneFieldClass="col-span-2 sm:col-span-1"
              fieldClass="contact-page-field-bg rounded-sm"
              firstName="First Name"
              messageOptional
            />
            {/* Make sure this section is needed or not */}
            {/* <div className="flex flex-col gap-space-15 sm:gap-space-20 sm:gap-space-10 sm:flex-row w-full justify-between mt-space-12 md:mt-space-24 border-t border-border-light text-text-placeholder very-small-heading pt-space-14 md:pt-space-28">
              <div className="flex flex-col sm:gap-space-06">
                <div>{email || t('defaultEmail')}</div>
                <div>{phone || '+1 (234) 567-890'}</div>
              </div>
              <div className="flex flex-col gap-space-12 sm:max-w-pct-030">
                <div>{address || t('defaultAddress')}</div>
                <div className="flex gap-space-08">
                  <Link href="https://www.facebook.com/navare.ai" target="_blank">
                    <Image src="/assets/icons/fb-green-icon.svg" alt="facebook" width={20} height={20} />
                  </Link>
                  <Link href="https://www.x.com/navare.ai" target="_blank">
                    <Image src="/assets/icons/twitter-green-icon.svg" alt="linkedin" width={20} height={20} />
                  </Link>
                  <Link href="https://www.linkedin.com/company/navare-ai" target="_blank">
                    <Image src="/assets/icons/linkedin-green-icon.svg" alt="instagram" width={20} height={20} />
                  </Link>
                </div>
              </div>
            </div> */}
            {/* Make sure this section is needed or not */}
          </div>

          {/* Unified Notification Popup - only render when there's an active state */}
          {(showPopup) && (
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
          <div className="hidden xl:block w-space-05 h-space-05 rotate-45 border-primary border absolute -bottom-space-02 -left-space-03 bg-navare-green"></div>
          <div className="hidden xl:block w-space-05 h-space-05 rotate-45 border-primary border absolute -bottom-space-02 -right-space-03 bg-navare-green"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
