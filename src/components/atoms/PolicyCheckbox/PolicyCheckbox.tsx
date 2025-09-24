import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface policyProps {
  link: string;
  checked: boolean;
  onChange: () => void;
  text?: string;
  linkText?: string;
}

const PrivacyCheckbox = ({ checked, onChange, link, text, linkText }: policyProps) => {
  const t = useTranslations('ContactUsNew');
  return (
    <label className="flex items-center gap-2 text-body text-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-current"
      />
      <span>
        {text || t('iAccept')}
        {' '}
        <Link href={link} className="underline text-secondary-text hover:text-subtle-dark">
          {linkText || t('privatePolicy')}
        </Link>
      </span>
    </label>
  );
};

export default PrivacyCheckbox;
