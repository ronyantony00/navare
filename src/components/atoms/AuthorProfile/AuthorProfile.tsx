import Image from 'next/image';
import { getInitials } from '@/utils/utilFunctions/getInitials';

interface AuthorProfileProps {
  avatarUrl?: string | null;
  name: string;
  role: string;
  avatarAlt?: string;
  companyLogo?: string;
}

const AuthorProfile = ({ avatarUrl, name, role, avatarAlt, companyLogo }: AuthorProfileProps) => {
  const hasValidCompanyLogo = companyLogo && companyLogo.trim() !== '';
  const hasValidAvatar = avatarUrl && avatarUrl.trim() !== '';
  const initials = getInitials(name);

  return (
    <div className="flex gap-space-10 items-center">
      {hasValidCompanyLogo
        ? (
            <div className="min-h-space-10">
              <Image
                src={companyLogo}
                alt="Company Logo"
                width={100}
                height={100}
                className="object-contain h-full"
              />
            </div>
          )
        : hasValidAvatar
          ? (
              <Image
                src={avatarUrl}
                alt={avatarAlt || `${name} avatar`}
                width={100}
                height={100}
                className="size-space-24 object-cover object-center rounded-full"
                priority
              />
            )
          : (
              <div className="size-space-24 rounded-full stories-card-bg border border-border-color flex items-center justify-center">
                <span className="small-content font-medium text-primary">
                  {initials}
                </span>
              </div>
            )}
      <div className="flex flex-col justify-center">
        <div className="small-content text-primary">{name}</div>
        <div className="small-content text-desc-text">{role}</div>
      </div>
    </div>
  );
};

export default AuthorProfile;
