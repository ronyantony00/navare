import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface IntegrationSelectProps {
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const IntegrationSelect = ({ options = [], value, onChange, placeholder, className = '' }: IntegrationSelectProps) => {
  return (
    <select
      className={clsx(
        'px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
        className,
      )}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default IntegrationSelect;
