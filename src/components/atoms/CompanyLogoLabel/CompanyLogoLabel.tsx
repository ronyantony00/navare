import Image from 'next/image';

interface LogoLabelProps {
  logo: string;
  isWide?: boolean;
}

const CompanyLogoLabel = ({ logo, isWide = false }: LogoLabelProps) => {
  return (
    <div
      className={`
        rounded-sm
        bg-primary
        p-space-12
        flex 
        justify-center 
        items-center 
        min-h-space-40
        ${isWide ? 'col-span-2' : 'col-span-1'}
      `}
    >
      <div className="relative w-full h-full">
        <Image
          src={logo}
          alt="company-logo"
          fill
          className="object-contain w-full "
        />
      </div>
    </div>
  );
};

export default CompanyLogoLabel;
