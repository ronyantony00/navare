import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface ButtonProps {
  onClick?: () => void;
  mainClass?: string;
  variant: 'primary' | 'secondary' | 'outline' | 'linkButton' | 'rounded' | 'testimonial' | 'pagination';
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  arrow?: boolean;
  arrowDirection?: 'left' | 'right';
  animation?: boolean;
  link?: string;
  disabled?: boolean;
  arrowClassName?: string;
  wrapText?: boolean;
}

const Button = ({ mainClass, variant, text, onClick, type, arrow, arrowClassName, arrowDirection = 'right', animation, link, disabled, wrapText }: ButtonProps) => {
  const BUTTON_VARIANTS = {
    primary: 'btn-gradient ease-in-out duration-500 text-black font-bold text-wrap rounded-2xs px-space-07 py-space-05',
    secondary: 'bg-transparent border-btn-secondary text-secondary-text border hover:bg-btn-primary hover:border-0 rounded-full px-space-16 py-space-08',
    outline: 'bg-transparent border-primary text-subtle-desc font-normal hover:border-base-white border rounded-2xs px-space-10 py-space-05',
    linkButton: 'bg-transparent border border-link-hover text-secondary-text hover:text-subtle-text px-space-10 py-space-06 transition-transform duration-200 hover:scale-100',
    rounded: 'bg-primary rounded-full border border-link-hover text-secondary-text hover:text-subtle-text p-space-02 sm:p-space-03',
    testimonial: 'bg-transparent border-none text-primary font-bold rounded-full px-space-10 py-space-05',
    pagination: 'md:px-space-13 md:py-space-08 px-space-10 py-space-06',
  } as const;

  const buttonClassName = clsx(
    'group text-size-4xs flex gap-1 truncate items-center justify-center overflow-hidden cursor-pointer',
    !wrapText && 'whitespace-nowrap',
    'active:scale-95',
    BUTTON_VARIANTS[variant],
    animation && 'transition-transform duration-500 ease-in-out hover:-translate-y-1',
    mainClass,
    disabled
      ? 'cursor-not-allowed opacity-60 group-hover:ring-2 group-hover:ring-red-500'
      : 'cursor-pointer',
  );

  const arrowAnimationClassName = clsx(
    animation && [
      'transition-transform',
      'duration-500',
      'ease-in-out',
      'group-hover:-translate-y-1',
      'group-hover:translate-x-0.5',

    ],
  );

  const getArrowIcon = () => {
    // If the variant is outline, use the white arrow icon.
    if (variant === 'outline') {
      return ImageConstants.WhiteArrow;
    }
    // If the variant is rounded, pick the arrow based on the provided direction.
    if (variant === 'rounded') {
      return arrowDirection === 'left' ? ImageConstants.BlackLeftArrow : ImageConstants.BlackRightArrow;
    }
    // If the variant is testimonial, pick the green arrow based on the provided direction.
    if (variant === 'testimonial') {
      return arrowDirection === 'left' ? ImageConstants.LeftGreenArrow : ImageConstants.RightGreenArrow;
    }
    // For other variants keep using the default arrow.
    return ImageConstants.BlackArrow;
  };

  const content = (
    <>
      {text}
      {arrow && (
        <Image
          src={getArrowIcon()}
          width={32}
          height={32}
          alt="arrow-icon"
          loading="lazy"
          className={`${arrowClassName} ${arrowAnimationClassName}`}
        />
      )}
      {variant === 'linkButton' && !arrow && <Image src={ImageConstants.rightArrow} alt="arrow" width={28} height={28} />}
    </>
  );

  if (link) {
    const isExternal = /^https?:\/\//.test(link);
    return (
      <Link href={link} className={buttonClassName} aria-label={text} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </Link>
    );
  }

  return (
    <button disabled={disabled} aria-label={text} type={type || 'button'} className={buttonClassName} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
