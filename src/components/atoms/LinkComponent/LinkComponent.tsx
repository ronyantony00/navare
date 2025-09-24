import Image from 'next/image';
import Link from 'next/link';

interface LinkProps {
  text: string;
  path: string;
  className?: string;
  icon?: string;
}

const LinkComponent = ({ text, path, className, icon }: LinkProps) => {
  return (
    <Link href={path} className={className ?? 'text-base-black hover:text-link-hover'}>
      <span className="flex items-center">
        {icon && <Image src={icon} alt={`${text}-icon`} width={21} height={21} className="mr-space-07" />}
        {text}
      </span>
    </Link>
  );
};

export default LinkComponent;
