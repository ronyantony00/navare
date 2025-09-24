import Image from 'next/image';
import Link from 'next/link';

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
}

const FooterLinkGroup = ({ title, links }: LinkGroupProps) => {
  return (
    <div className="flex flex-col gap-space-08 md:gap-space-12 items-center 2xs:items-start xl:min-w-space-74 base-space-200">
      <div className="text-size-2xs text-secondary-text font-bold">{title}</div>
      <div className="flex flex-col gap-space-07 items-center 2xs:items-start">
        {links.map(link => (
          <div key={link.id} className="">
            <Link href={link.path} className="flex gap-space-03">
              {link.icon && <Image src={link.icon} alt={link.linkText} width={18} height={18} />}
              <div className="text-subtle-text hover:text-link-subtle text-size-4xs font-normal">{link.linkText}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinkGroup;
