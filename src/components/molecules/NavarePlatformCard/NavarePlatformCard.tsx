import React from 'react';

export type NavarePlatformCardVariant = 'card-container' | 'card-transport' | 'card-navscan' | 'card-navbridge';

export interface NavarePlatformCardProps {
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
  variant: NavarePlatformCardVariant;
  ariaLabel: string;
  href: string;
}

const NavarePlatformCard = ({
  logo,
  logoAlt,
  title,
  description,
  variant,
  ariaLabel,
  href,
}: NavarePlatformCardProps) => {
  return (
    <a
      aria-label={ariaLabel}
      className={`product-card group ${variant} relative flex h-full flex-col justify-center p-[14px]`}
      href={href}
    >
      <div className="relative z-10 flex flex-col gap-2 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="h-[42px] w-[149px] shrink-0 overflow-hidden rounded-[3px] bg-white">
            <img
              alt={logoAlt}
              className="block h-full w-full object-contain object-left-top"
              src={logo}
            />
          </div>
          <svg
            aria-hidden="true"
            className="arrow h-[18px] w-[18px] shrink-0 transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-x-0.5 group-hover:-translate-y-1"
            viewBox="0 0 14 14"
          >
            <path
              className="fill-none stroke-[#2ed960] [stroke-linecap:round] [stroke-linejoin:round]"
              d="M4.2 9.8 9.8 4.2M5.2 4.2h4.6v4.6"
              strokeWidth="1.45"
            />
          </svg>
        </div>
        <div className="copy flex flex-col">
          <div className="text-[14px] text-white whitespace-nowrap transition-colors duration-200 group-hover:text-[#2ed960]">
            {title}
          </div>
          <div className="text-[12px] max-w-[260px] text-xs leading-[1.45] font-normal tracking-[-0.08px] text-[#738079]">
            {description}
          </div>
        </div>
      </div>
    </a>
  );
};

export default NavarePlatformCard;
