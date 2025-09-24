import clsx from 'clsx';
import { useMemo } from 'react';
import NavOption from '@/components/atoms/NavOption/NavOption';

const SMALL_LAYOUT_THRESHOLD = 4;
const MEDIUM_LAYOUT_THRESHOLD = 6;

interface NavigationOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

interface OptionsSectionProps {
  options: NavigationOption[];
  onNavigate?: () => void;
}

const NavOptionSection = ({ options, onNavigate }: OptionsSectionProps) => {
  const optionsLength = options.length;

  const layoutConfig = useMemo(() => {
    if (optionsLength < SMALL_LAYOUT_THRESHOLD) {
      return {
        containerClass: clsx(
          'flex flex-col gap-space-05',
          '2xs:flex 2xs:flex-col 2xs:gap-space-08',
        ),
        iconOnTop: false,
      };
    } else if (optionsLength === SMALL_LAYOUT_THRESHOLD) {
      return {
        containerClass: clsx(
          'flex flex-col',
          '2xs:grid 2xs:grid-cols-2 2xs:grid-rows-2',
          'xl:gap-space-20 md:gap-space-15 gap-space-10',
          '',
        ),
        iconOnTop: true,
      };
    } else if (optionsLength <= MEDIUM_LAYOUT_THRESHOLD) {
      return {
        containerClass: clsx(
          'flex flex-col',
          '2xs:grid 2xs:grid-cols-3 2xs:grid-rows-2',
          // 'gap-space-05',
          // '2xs:gap-x-space-10 md:gap-x-space-15 xl:gap-x-space-20 2xs:gap-y-space-16 2md:gap-y-space-34',
          'xl:gap-space-20 md:gap-space-15 gap-space-10',
        ),
        iconOnTop: true,
      };
    } else {
      return {
        containerClass: clsx(
          'flex flex-col',
          'sm:grid sm:grid-cols-4 sm:grid-rows-2',
          // 'gap-space-05',
          // '2xs:gap-x-space-10 md:gap-x-space-20 xl:gap-x-space-35 2xs:gap-y-space-16 2md:gap-y-space-34',
          'xl:gap-space-20 md:gap-space-15 gap-space-10',
        ),
        iconOnTop: true,
      };
    }
  }, [optionsLength]);

  const { containerClass, iconOnTop } = layoutConfig;

  return (
    <div className={containerClass}>
      {options.map(option => (
        <NavOption
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          iconOnTop={iconOnTop}
          href={option.href}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};

export default NavOptionSection;
