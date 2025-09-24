import Image from 'next/image';
import IntegrationBadge from '@/components/atoms/IntegrationBadge/IntegrationBadge';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface Badge {
  text: string;
  variant?: 'default' | 'techPlatform' | 'featured' | 'carrier';
}

interface CardHeaderProps {
  logo: string;
  title: string;
  badges?: Badge[];
}

const CardHeader = ({ logo, title, badges }: CardHeaderProps) => {
  const logoUrl = logo ? getImageUrl(logo) : undefined;

  return (
    <div className="flex flex-col gap-space-08">
      <div className="flex justify-between">
        {logoUrl && (
          <Image src={logoUrl} alt="company-logo" width={70} height={70} />
        )}
        <div>
          {badges?.map((badge, index) => (
            <IntegrationBadge key={`${badge.text}-${index}`} variant={badge.variant}>
              {badge.text}
            </IntegrationBadge>
          ))}
        </div>
      </div>
      <div className="mb-1 text-size-2xs sm:text-size-sm font-bold">{title}</div>
    </div>
  );
};

export default CardHeader;
