import { useTranslations } from 'next-intl';
import Button from '../CustomButton/Button';

interface NotificationPopupProps {
  isLoading?: boolean;
  submitStatus?: boolean;
  error?: string | null;
  setError?: (error: string | null) => void;
  titleText?: string;
  descriptionText?: string;
  setShowPopup?: (showPopup: boolean) => void;
  variant?: 'default' | 'cookies';
  onCookieAccept?: () => void;
  onCookieReject?: () => void;
}

const NotificationPopup = ({
  isLoading: _isLoading,
  submitStatus,
  error,
  setError,
  setShowPopup,
  variant = 'default',
  onCookieAccept,
  onCookieReject,
}: NotificationPopupProps) => {
  const t = useTranslations('successPopup');

  // Handle cookies variant
  if (variant === 'cookies') {
    return (
      <div className="fixed bg-navare-green bottom-space-20 mx-space-10 sm:mx-space-00 2xs:right-space-10 z-999 rounded-xl border border-border-color shadow-lg px-space-07
      py-space-10 sm:px-space-15 sm:py-space-15 2xs:max-w-space-200 md:max-w-space-300"
      >
        <div className="flex flex-col gap-space-15">
          <div className="card-title text-subtle-desc text-center">{t('cookieTitle')}</div>
          <div className="secondary-content text-subtle-desc text-center">
            {t('cookieDescription')}
          </div>
          <div className="flex gap-space-10 justify-center">
            <Button
              variant="outline"
              text={t('cookieReject')}
              onClick={onCookieReject}
            />
            <Button
              variant="primary"
              text={t('cookieAccept')}
              onClick={onCookieAccept}
            />
          </div>
        </div>
      </div>
    );
  }

  // Handle default variant (existing logic)
  if (!submitStatus && !error) {
    return null;
  }

  const isError = Boolean(error);
  const title = isError ? t('error') : t('title');
  const description = isError ? t('failedDescription') : t('successDescription');
  const buttonText = isError ? t('buttonFailedText') : t('buttonSuccessText');
  const handleButtonClick = () => {
    if (isError && setError) {
      setError(null);
    }
    setShowPopup && setShowPopup(false); // Always close popup
  };

  return (
    // <div className="py-space-72 px-space-100 rounded-[28px] overflow-hidden border border-border-color bg-navare-green">
    <div className="m-space-10 pt-space-10 pb-space-20 px-space-10 rounded-xl overflow-hidden border border-border-color bg-navare-green relative z-50 sm:max-w-pct-050">
      <div className="flex flex-col h-full items-center justify-center gap-space-05">
        <div className="sub-heading text-subtle-desc text-center z-10">{title}</div>
        <div className="small-card-heading text-subtle-desc text-center lg:max-w-pct-070 z-10">{ description}</div>
        {error && <div className="small-card-heading text-subtle-desc text-center mt-space-06 z-10">{t('contactSupport')}</div> }
        <div className="z-10">
          <Button variant="primary" arrow text={buttonText} onClick={handleButtonClick} arrowClassName="size-space-05" mainClass="gap-space-05 mt-space-05" />
        </div>
      </div>
      <span className="absolute -top-space-20 left-space-00 w-space-100 h-space-100 bg-blue-circle-bg rounded-full blur-[80px] opacity-80"></span>
      <span className="absolute -top-space-30 right-space-80 w-space-150 h-space-150 bg-secondary-blur rounded-full blur-[150px]"></span>
    </div>
  );
};

export default NotificationPopup;
