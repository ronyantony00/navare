import type { Job } from '@/types/apiTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/components/atoms/CustomButton/Button';
import JobDetailSection from '@/components/atoms/JobInfoCard/JobDetailSection';
import JobInfoItem from '@/components/atoms/JobInfoCard/JobInfoCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface CareerdetailPageProps {
  job?: Job;
}

const CareerDetailPage = ({ job }: CareerdetailPageProps) => {
  console.warn('JOB DATA:', job);
  const t = useTranslations('CareersJobDetail');
  return (
    <div className="w-full  flex flex-col items-center justify-center bg-landing-hero-bg-color">
      <div className="relative  w-full bg-[image:var(--bg-career-detail-hero-image)] bg-cover bg-center bg-no-repeat section-padding-x flex flex-col justify-center items-center h-full 4k:py-space-100  4k:max-h-space-600 max-h-max-height section-padding-y">
        <div className="max-w-maxwidth flex flex-col items-center justify-center">
          <TextCombo
            title={job?.jobTitle || ''}
            description={job?.jobIntroduction || ''}
            buttonOneText={t('applyNow')}
            spanClass="text-primary"
            descClass="xl:w-pct-080"
            className="text-center flex justify-center items-center z-10 max-w-pct-080"
            titleClass="hero-title"
            buttonOneLink={job?.job_link || '#'}
          />
        </div>
      </div>
      <div className="w-full relative">
        <Image
          src={ImageConstants.CareerDetailBg}
          alt="apply-now"
          width={1000}
          height={1000}
          className="absolute object-cover object-top 4k:-top-space-160 2k:-top-space-60 md:-top-space-40 -top-space-20 left-0 w-full max-h-[120%] bg-clip-content"
        />
        <div className="flex flex-col items-center justify-center max-w-maxwidth mx-auto gap-space-20 z-50 section-padding-x md:pb-space-30 pb-space-20">
          <div className="w-full min-h-space-38 md:p-space-28 p-space-10 rounded-lg stories-card-bg flex flex-col items-center gap-space-10 z-50 border border-border-color">
            <div className="card-title font-comme gradient-text self-start">{t('introduction')}</div>
            <div className="w-full flex 2md:flex-row flex-col 2md:items-center 2md:justify-between 2md:gap-space-08 gap-space-10 lg:px-space-20">
              <JobInfoItem label={t('city')} value={job?.job_locations?.jobLocation || 'No data'} />
              <div className="bg-primary 2md:w-space-01 w-full 2md:h-auto h-space-01 self-stretch"></div>
              <JobInfoItem label={t('department')} value={job?.department?.departmentName || 'No data'} />
              <div className="bg-primary 2md:w-space-01 w-full 2md:h-auto h-space-01 self-stretch"></div>
              <JobInfoItem label={t('jobLevel')} value={job?.job_level?.jobLevel || 'No data'} />
              <div className="bg-primary 2md:w-space-01 w-full 2md:h-auto h-space-01 self-stretch"></div>
              <JobInfoItem label={t('employmentType')} value={job?.employmentType?.employmentType || 'No data'} />
            </div>
          </div>
          <div className="relative  w-full md:p-space-28 p-space-10 flex flex-col border border-border-color overflow-hidden rounded-lg">
            <div className="card-title font-comme gradient-text text-left mb-space-15">{t('description')}</div>
            <JobDetailSection
              // title={t('aboutTheRole')}
              richText={job?.jobDescription}
              isArray={true}
            />
            <div className="card-title font-comme gradient-text text-left pb-space-12 pt-space-02">{t('details')}</div>
            <JobDetailSection
              // title={t('jobDetails')}
              richText={job?.jobDetails}
              isArray={true}
            />
            <div className="card-title font-comme gradient-text text-left pb-space-12 pt-space-02">{t('others')}</div>
            <JobDetailSection
              content={job?.otherDetails || t('noJobDetails')}
            />
            <Button variant="primary" animation mainClass="max-w-space-74 mx-auto gap-space-05 w-full sm:mt-space-25 mt-space-15" text={t('applyNow')} arrow arrowClassName="size-space-05" link={job?.job_link || '#'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetailPage;
