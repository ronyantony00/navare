import clsx from 'clsx';

interface SectionHeaderProps {
  titlePrefix?: string;
  titleHighlight: string;
  titleSuffix?: string;
  description?: string;
  titleClass?: string;
  mainClass?: string;
  descriptionClass?: string;
  variant: 'large' | 'medium' | 'small' | 'custom' | 'gradient';
  customClass?: string;
}

const SectionHeader = ({ titlePrefix, titleHighlight, titleSuffix, description, titleClass, descriptionClass, variant, mainClass, customClass }: SectionHeaderProps) => {
  const titleVariants = {
    large: 'text-size-lg-2 leading-very-tight sm:text-size-xl sm:leading-display md:text-size-3xl md:leading-hero-loose text-secondary-text font-medium',
    medium: 'text-size-lg-2 leading-very-tight sm:text-size-xl-2 md:text-size-2xl md:leading-display-medium text-secondary-text font-medium',
    small: 'text-size-lg-2 leading-very-tight sm:leading-display-md-2 sm:text-size-xl-2 text-secondary-text font-medium',
    gradient: 'text-size-2sm leading-very-loose gradient-text font-medium',
    custom: customClass,
  } as const;

  const titleClassName = clsx(
    titleVariants[variant],
    titleClass,
  );

  return (
    <div className={`flex flex-col ${mainClass}`}>
      <div className={titleClassName}>
        <span>{titlePrefix}</span>
        {' '}
        <span className="text-navare-secondary-green">{titleHighlight}</span>
        {' '}
        <span>{titleSuffix}</span>
      </div>
      <div className={`text-3xs text-subtle-text leading-tight ${descriptionClass}`}>{description}</div>
    </div>
  );
};

export default SectionHeader;
