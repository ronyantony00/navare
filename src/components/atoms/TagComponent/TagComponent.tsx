import clsx from 'clsx';

interface TagProps {
  text: string;
  variant: 'primary' | 'secondary';
  className?: string;
}

const TagComponent = ({ text, variant, className }: TagProps) => {
  const TagVariants = {
    primary: 'bg-transparent rounded-md-3 p-space-05 text-subtle-desc border border-subtle-desc',
    secondary: 'bg-btn-secondary text-primary rounded-md-3 px-space-08 py-space-04',
  } as const;

  const tagClassName = clsx(
    'w-fit',
    className,
    TagVariants[variant],
  );

  return (
    <div className={`${tagClassName}`}>
      {text}
    </div>
  );
};

export default TagComponent;
