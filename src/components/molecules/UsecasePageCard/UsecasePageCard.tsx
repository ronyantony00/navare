import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface CardProps {
  icon?: string;
  title?: string;
  description?: string;
}

const UsecasePageCard = ({ icon, title, description }: CardProps) => {
  const t = useTranslations('commonMessages');
  return (
    <div className="flex flex-col gap-space-06 2md:max-w-space-175 border border-navare-green-light usecase-card-gradient feature-card-shadow
    px-space-10 md:px-space-18 pt-space-15 pb-space-20 2md:pb-space-40 w-full h-full rounded-md-3"
    >
      {icon && <div className="flex"><Image src={icon || ''} width={50} height={50} alt="icon" /></div>}
      <div className="flex flex-col gap-space-06 sm:gap-space-12">
        <div className="very-small-heading text-subtle-desc">{title}</div>
        {description
          ? (
              <div className="small-content text-desc-text">{description}</div>
            )
          : (
              <div className="w-full h-full flex justify-center items-center text-size-3xs text-subtle-text">{t('no_content_found')}</div>
            )}
      </div>
    </div>
  );
};

export default UsecasePageCard;
