import clsx from 'clsx';

interface IntegrationLogoProps {
  company: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const IntegrationLogo = ({ company, size = 'medium', className = '' }: IntegrationLogoProps) => {
  const sizes = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-xs',
    large: 'w-20 h-20 text-sm',
  };

  const logoStyles = {
    'shopify': 'bg-green-600 text-white',
    'allied-express': 'bg-red-600 text-white',
    'apparel21': 'bg-gray-800 text-white',
    'aramex-au': 'bg-red-600 text-white',
    'aramex-nz': 'bg-red-600 text-white',
    'aramex-sg-my': 'bg-red-600 text-white',
    'australia-post': 'bg-red-600 text-white',
    'bigcommerce': 'bg-gray-800 text-white',
    'bonds-couriers': 'bg-blue-700 text-white',
  };

  const logoText = {
    'shopify': 'shopify',
    'allied-express': 'ALLIED',
    'apparel21': 'A21',
    'aramex-au': 'aramex',
    'aramex-nz': 'aramex',
    'aramex-sg-my': 'aramex',
    'australia-post': '🏢',
    'bigcommerce': 'BC',
    'bonds-couriers': 'BONDS',
  };

  return (
    <div className={clsx(
      sizes[size],
      logoStyles[company as keyof typeof logoStyles] || 'bg-gray-200 text-gray-600',
      'rounded-md flex items-center justify-center font-bold',
      className,
    )}
    >
      {logoText[company as keyof typeof logoText] || company?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
};

export default IntegrationLogo;
