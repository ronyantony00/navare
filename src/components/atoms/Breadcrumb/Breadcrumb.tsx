'use client';
import Link from 'next/link';
import React, { Fragment } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`w-full ${className}`}>
      <ol className="flex flex-wrap items-center gap-y-space-02 text-size-5xs 2xs:text-size-4xs min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.href ?? item.label}>
              {index > 0 && (
                <li className="text-white px-space-03 shrink-0 font-medium" aria-hidden="true">
                  /
                </li>
              )}
              <li className="min-w-0">
                {item.href && !isLast
                  ? (
                      <Link
                        href={item.href}
                        className="text-desc-text hover:text-primary transition-colors truncate"
                      >
                        {item.label}
                      </Link>
                    )
                  : (
                      <span
                        className={`truncate ${isLast ? 'text-subtle-text font-medium' : 'text-desc-text'}`}
                        aria-current={isLast ? 'page' : undefined}
                      >
                        {item.label}
                      </span>
                    )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
