'use client';
import type { FeatureCardProps } from '@/types/commonTypes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

const FeatureCard = ({ smallTitle, title, description, icon, showButton = false, links, mainClass, image, showDropdown, dropdownOptions, iconClassName, variant = 'default' }: FeatureCardProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>('Archived Version');
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className={`relative ${variant === 'legal' ? '2md:px-space-15 2md:pt-space-16 px-space-07 pt-space-12' : 'px-space-07 pt-space-12'} flex flex-col gap-space-05 border border-green-secondary ${mainClass}`}>
      {icon && (
        <Image
          src={icon}
          width={50}
          height={50}
          alt="small icon"
          className={`${iconClassName}`}
        />
      )}
      <div className="text-size-4xs text-desc-text">{smallTitle}</div>
      <div className={` ${variant === 'legal' ? 'card-title' : 'small-card-heading'} text-subtle-desc mb-space-02`}>{title}</div>

      <div className={`${variant === 'legal' ? 'block' : 'hidden'} w-space-05 h-space-05 rotate-45 border-primary border absolute -top-space-03 -left-space-03 bg-navare-green z-50`}></div>
      <div className={`${variant === 'legal' ? 'block' : 'hidden'} w-space-05 h-space-05 rotate-45 border-primary border absolute -top-space-03 -right-space-03 bg-navare-green z-50`}></div>

      {links && links.length > 0
        ? (
            <div className="flex flex-col gap-space-06 mt-space-03">
              {links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.href || '#'}
                  className="text-size-3xs underline text-primary leading-description hover:text-btn-primary hover:underline transition-colors duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          )
        : (
            <div className="small-content text-desc-text leading-description w-pct-090 mb-space-02">{description}</div>
          )}
      {image && (
        <Image
          src={image}
          width={1000}
          height={1000}
          alt="check"
          className="object-cover size-full rounded-t-lg rounded-b-none border-b-0 border-2 border-border-color"
        />
      )}
      {showButton && (
        <button type="button" className="absolute flex items-center justify-center top-space-02 right-0 w-space-30">
          <Image
            src={ImageConstants.GreenArrow}
            width={50}
            height={50}
            alt="check"
          />
        </button>
      )}
      {/* add an accordion here */}
      {showDropdown && dropdownOptions && dropdownOptions.length > 0 && (
        <div className="relative mt-2" ref={dropdownRef}>
          <button
            id="dropdownDefaultButton"
            type="button"
            className="text-white stories-card-bg font-medium rounded-2xs text-size-4xs px-5 py-2.5 text-center inline-flex items-center"
            onClick={() => setDropdownOpen(open => !open)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {selectedLabel}
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-50 ${dropdownOpen ? '' : 'hidden'} stories-card-bg rounded-2xs absolute mt-2 left-0 w-full`}
            role="menu"
            aria-labelledby="dropdownDefaultButton"
          >
            <ul className="py-space-04 flex flex-col gap-space-02 items-center">
              {dropdownOptions.map((option, idx) => (
                <li key={idx} className="text-size-4xs text-white hover:text-primary w-full">
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 bg-transparent hover:text-primary focus:outline-none"
                    onClick={() => {
                      setSelectedLabel(option.label);
                      setDropdownOpen(false);
                    }}
                    role="menuitem"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
