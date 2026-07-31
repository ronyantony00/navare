import clsx from 'clsx';
import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface Badge {
  text: string;
  variant?: 'default' | 'techPlatform' | 'featured' | 'carrier';
}

interface IntegrationCardProps {
  id?: number;
  logo?: string;
  title?: string;
  description?: string;
  badges?: Badge[];
  className?: string;
}

const IntegrationCard = ({ logo, title, description, className }: IntegrationCardProps) => {
  const logoUrl = logo ? getImageUrl(logo) : undefined;

  return (
    <div className={clsx('border border-border-color rounded-md-2 hover:border-primary impact-card-bg md:p-space-15 p-space-10 cursor-pointer w-full', className)}>
      <div className="flex flex-col gap-space-12">
        <div className="flex justify-between items-center gap-space-08">
          <div className="flex gap-space-08 sm:gap-space-12 items-center min-w-0">
            <div className="impact-card-bg border border-border-color w-fit rounded p-space-02 flex items-center justify-center shrink-0">
              <Image src={logoUrl || ''} alt="company-logo" width={65} height={60} className="object-cover" />
            </div>
            <div className="text-subtle-desc font-medium small-card-heading my-auto truncate">{title}</div>
          </div>
          <Image src={ImageConstants.GreenArrow} unoptimized loading="eager" alt="arrow-right" width={42} height={42} className="my-auto shrink-0 ml-space-02" />
        </div>
        <div className="text-text-placeholder secondary-content">{description}</div>
      </div>
    </div>
  );
};

export default IntegrationCard;
