import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/components/atoms/CustomButton/Button';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface planFeature {
  featureName: string;
  featureDescription?: string | null;
}

interface PlanCardProps {
  planType?: string;
  planTier?: string;
  planBadge?: string;
  planTypeName?: string;
  description?: string;
  features?: planFeature[];
  mainClass?: string;
  planDuration?: string;
}

// Single function that returns all styling based on plan type
const getPlanCardStyles = (planBadge?: string, mainClass?: string) => {
  const isMostPopular = planBadge === 'Most Popular';

  const baseClasses = 'h-full px-space-10 w-full mx-auto max-w-space-200 md:px-space-16 border border-green-secondary relative pt-space-13 pb-space-24';

  if (isMostPopular) {
    return {
      containerClasses: `${baseClasses} lg:pt-space-15 lg:pb-space-20 rounded-sm bg-[image:var(--bg-popular-plan)] bg-cover bg-center ${mainClass || ''}`,
      featuresMarginClass: 'mt-space-21 lg:mt-space-27',
      tickIcon: ImageConstants.GreenTick,
      isMostPopular: true,
    };
  }

  return {
    containerClasses: `${baseClasses} rounded-md-3 plan-card-bg ${mainClass || ''}`,
    featuresMarginClass: 'mt-space-21',
    tickIcon: ImageConstants.GreenTick,
    isMostPopular: false,
  };
};

const PlanCard = ({ planType, planBadge, description, features, mainClass, planDuration }: PlanCardProps) => {
  const t = useTranslations('ImageWithContent');

  const styles = getPlanCardStyles(planBadge, mainClass);

  return (
    <div className={styles.containerClasses}>
      <div className="flex flex-col">

        {/* Background Video for Most Popular */}
        {styles.isMostPopular && (
          <video
            src="assets/videos/light-rays.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0 z-0 opacity-60"
          />
        )}

        {/* Plan type and badge */}
        <div className="flex flex-wrap gap-space-10 justify-between w-full md:self-center z-10">
          <div className="text-white text-size-2sm font-medium">{planType}</div>
          {planBadge && (
            <div className="px-space-05 py-space-03 text-size-4xs bg-primary text-black font-bold rounded-xl h-fit">
              {planBadge}
            </div>
          )}
        </div>

        {/* Rate and description */}
        <div className="flex flex-col gap-space-05 mt-space-12 z-10">
          <div className="text-white text-size-md-2 font-bold leading-display-tight">
            $0,00
            <span className="text-size-3xs leading-normal font-normal">
              /
              {' '}
              {planDuration === 'yearly' ? t('yearly') : t('monthly')}
            </span>
          </div>
          <div className="text-size-4xs text-desc-text leading-description">{description}</div>
        </div>

        {/* Features title and features list */}
        <div className={`flex flex-col gap-space-07 ${styles.featuresMarginClass} z-10`}>
          <div className="text-white text-size-4xs font-normal">{t('features')}</div>
          {features?.map((feature, index) => (
            <div key={index} className="flex gap-space-07">
              <Image
                src={styles.tickIcon}
                width={28}
                height={28}
                alt="add on"
                className="size-space-14 self-center"
              />
              <div className="text-size-4xs text-desc-text">{feature.featureName}</div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="w-full mx-auto mt-space-21 z-10">
          <Button variant="primary" animation={true} arrow={true} text="Book a Demo" link="/schedule-demo" arrowClassName="size-space-05 gap-space-05" />
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
