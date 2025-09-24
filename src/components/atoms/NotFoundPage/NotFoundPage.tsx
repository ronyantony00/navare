import { useTranslations } from 'next-intl';
import Button from '../CustomButton/Button';

const NotFoundPage = () => {
  const t = useTranslations('404page');
  return (
    <div className="w-full min-h-screen flex justify-center items-center relative bg-[image:var(--bg-error-page-bg)] bg-cover bg-center overflow-hidden">
      <div className="flex flex-col text-subtle-desc text-center z-10 px-space-10 sm:px-space-00">
        <div className="text-size-3xl-3 sm:text-size-5xl-1 md:text-size-5xl-2 lg:text-size-5xl-3 font-medium leading-none">404</div>
        <div className="section-title mt-space-10">{t('not_found')}</div>
        <div className="primary-content mt-space-05 md:mt-space-12">{t('message')}</div>
        <div className="mt-space-10 md:mt-space-16 mx-auto"><Button text={t('button')} link="/" variant="primary" arrow={true} animation={true} arrowClassName="size-space-05" mainClass="gap-space-05 w-fit" /></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
