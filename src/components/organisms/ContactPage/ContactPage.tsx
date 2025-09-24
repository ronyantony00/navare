'use client';
// import SuccessPopup from '@/components/atoms/SuccessPopup/SuccessPopup';
// import ContactForm from '@/components/molecules/ContactForm/ContactForm';
import { useTranslations } from 'next-intl';
// import { useState } from 'react';

const ContactPage = () => {
  const t = useTranslations('contactUsPage');
  // const [submitStatus, setSubmitStatus] = useState(false);
  return (
    <section className="max-w-section-max-width mx-auto px-space-12 pb-space-20 ">
      <div className="flex flex-col 2md:flex-row gap-space-45 2md:gap-space-72">
        <div className="flex items-center 2md:max-w-space-235">
          <div className="flex flex-col gap-space-10">
            <div className="text-secondary-text text-size-lg-2 leading-very-tight sm:text-size-xl sm:leading-display md:text-size-3xl md:leading-hero-loose font-medium">{t('title')}</div>
            <div className="text-subtle-text text-size-3xs">{t('subtitle')}</div>
          </div>
        </div>
        {/* <ContactForm submitStatus={setSubmitStatus} /> */}
      </div>
      {/* {submitStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <SuccessPopup />
        </div>
      )} */}
    </section>
  );
};

export default ContactPage;
// max-w-[750px] 2md:max-w-[580px]
