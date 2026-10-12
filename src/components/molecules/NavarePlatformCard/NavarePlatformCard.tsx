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
      className={`nvp-card group nvp-${variant}`}
      href={href}
    >
      {/* The anchor stays still and owns the hover area; only this inner layer
          moves on hover, so hovering an edge can never make the card flicker. */}
      <div className="nvp-card-inner">
        <div className="nvp-card-stack relative z-10 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="nvp-card-logo shrink-0 overflow-hidden rounded-[3px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo may be a CMS CDN URL or an inline SVG data URI */}
              <img
                alt={logoAlt}
                className="block h-full w-full object-contain object-left-top"
                src={logo}
              />
            </div>
            <svg
              aria-hidden="true"
              className="h-[16px] w-[16px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1"
              viewBox="0 0 14 14"
            >
              <path
                className="fill-none stroke-[#2ed960] [stroke-linecap:round] [stroke-linejoin:round]"
                d="M4.2 9.8 9.8 4.2M5.2 4.2h4.6v4.6"
                strokeWidth="1.45"
              />
            </svg>
          </div>
          <div className="nvp-card-copy flex flex-col">
            <div className="nvp-card-title font-medium text-white transition-colors duration-200 group-hover:text-[#2ed960]">
              {title}
            </div>
            <div className="nvp-card-desc font-normal">
              {description}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NavarePlatformCard;
