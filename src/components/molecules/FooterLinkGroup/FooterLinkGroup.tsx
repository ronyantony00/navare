import Image from 'next/image';
import Link from 'next/link';
import { resolveNavigationLink } from '@/utils/Helpers';

interface linkItem {
  id: number;
  linkText: string;
  path: string;
  icon?: string;
  iconUrl?: string;
}
interface LinkGroupProps {
  title: string;
  links: linkItem[];
  className?: string;
}

const FooterLinkGroup = ({ title, links, className = '' }: LinkGroupProps) => {
  const isSocial = title === 'Social';

  return (
    <div className={`flex flex-col gap-space-08 md:gap-space-10 items-start max-2xs:items-center min-w-0 ${className}`}>
      <div className="text-size-5xs 2xs:text-size-4xs md:text-size-2xs text-secondary-text font-bold text-left max-2xs:text-center">
        {title}
      </div>
      <div
        className={`flex gap-space-07 ${
          isSocial
            ? 'flex-row flex-wrap items-center justify-start max-2xs:justify-center gap-x-space-12'
            : 'flex-col items-start max-2xs:items-center'
        }`}
      >
        {links.map((link) => {
          const { href, external } = resolveNavigationLink(link.path);
          const linkContent = (
            <>
              {link.icon && (
                <Image
                  src={link.icon}
                  alt=""
                  width={18}
                  height={18}
                  className="shrink-0"
                  aria-hidden
                />
              )}
              <span className="text-subtle-text hover:text-link-subtle text-size-5xs 2xs:text-size-4xs font-normal leading-relaxed text-left max-2xs:text-center">
                {link.linkText}
              </span>
            </>
          );

          return (
            <div key={link.id} className="min-w-0">
              {external
                ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-start max-2xs:justify-center gap-space-03"
                    >
                      {linkContent}
                    </a>
                  )
                : (
                    <Link href={href} className="flex items-center justify-start max-2xs:justify-center gap-space-03">
                      {linkContent}
                    </Link>
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterLinkGroup;
