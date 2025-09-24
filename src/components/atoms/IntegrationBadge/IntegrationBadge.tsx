import clsx from 'clsx';

interface IntegrationBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'techPlatform' | 'featured' | 'carrier';
  className?: string;
}

const IntegrationBadge = ({ children, variant = 'default', className = '' }: IntegrationBadgeProps) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    techPlatform: 'bg-purple-50 text-purple-700 border border-purple-200',
    featured: 'bg-green-500/80 text-white',
    carrier: 'bg-blue-50 text-blue-700',
  };

  return (
    <div className={clsx(
      'inline-flex items-center p-space-04 rounded-[4px] text-[14px] font-medium',
      variants[variant],
      className,
    )}
    >
      {children}
    </div>
  );
};

export default IntegrationBadge;
