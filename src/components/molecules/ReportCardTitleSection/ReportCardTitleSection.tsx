import { useTranslations } from 'next-intl';
import FilterButton from '@/components/atoms/FilterButton/FilterButton';

const ReportCardTitleSection = () => {
  const t = useTranslations('Integration.annualreport');
  return (
    <div className="flex flex-col gap-space-10 text-base-white">
      <div className="text-size-2sm md:text-size-xl font-bold">{t('title')}</div>
      <div className="text-size-4xs md:text-size-xs">{t('subtitle')}</div>
      <div><FilterButton variant="primary" size="medium">{t('download')}</FilterButton></div>
    </div>
  );
};

export default ReportCardTitleSection;
