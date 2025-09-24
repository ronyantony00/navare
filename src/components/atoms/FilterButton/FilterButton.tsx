import clsx from 'clsx';

interface FilterButtonProps {
  'children': React.ReactNode;
  'variant'?: 'primary' | 'secondary' | 'ghost';
  'size'?: 'small' | 'medium' | 'large';
  'active'?: boolean;
  'onClick'?: () => void;
  'className'?: string;
  'disabled'?: boolean;
  'role'?: string;
  'aria-selected'?: boolean;
}

const FilterButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  active = false,
  onClick,
  className = '',
  disabled = false,
  role,
  'aria-selected': ariaSelected,
  ...props
}: FilterButtonProps) => {
  const baseClasses = 'w-full inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: active
      ? 'bg-primary text-white'
      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-indigo-500',
    ghost: 'text-indigo-600 hover:text-indigo-700 hover:underline focus:ring-indigo-500',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-space-12 py-space-06 text-size-3xs rounded-sm border border-gray-600',
    large: 'px-6 py-3 text-base rounded-lg border',
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      role={role}
      aria-selected={ariaSelected}
      {...props}
    >
      {children}
    </button>
  );
};

export default FilterButton;
