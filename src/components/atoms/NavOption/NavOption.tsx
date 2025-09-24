import Image from 'next/image';
import Link from 'next/link';

interface NavOptionProps {
  title: string;
  description: string;
  icon: string;
  iconOnTop: boolean;
  href?: string;
  onNavigate?: () => void;
}

const NavOption = ({ title, description, icon, iconOnTop, href, onNavigate }: NavOptionProps) => {
  const content = (
    <div className={`p-px hover:bg-navare-green-light rounded-sm group ${iconOnTop ? '2md:max-w-space-135' : ''}`}>
      <div
        className={` flex ${iconOnTop ? 'flex-col gap-space-04' : ' flex-col gap-space-04 2md:flex-row 2md:gap-space-07'} navoption 
        rounded-sm cursor-pointer py-space-05 px-space-06`}
      >
        <div className="self-start ">
          <Image src={icon} alt="icon" width={32} height={32} priority className="h-space-12 w-space-12 md:w-space-16 md:h-space-16" />
        </div>
        <div className="flex flex-col gap-space-04">
          <div className="text-subtle-desc very-small-heading group-hover:text-primary ">{title}</div>
          <div className="text-subtle-desc small-content ">{description}</div>
        </div>
      </div>
    </div>
  );
  if (href) {
    return <Link href={href} onClick={onNavigate}>{content}</Link>;
  }
  return content;
};

export default NavOption;
