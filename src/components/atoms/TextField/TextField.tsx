import { MenuItem, TextField } from '@mui/material';

interface Option {
  id: number;
  label: string;
  value: string;
}

interface TextFieldWithLabelProps {
  label: string;
  variant?: 'text' | 'textarea' | 'select';
  required?: boolean;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | false;
  maxLength?: number;
  options?: Option[];
  autoComplete?: string;
  className?: string;
};

const TextFieldWithLabel = ({ label, required, name, value, onChange, error, maxLength, options, variant, type, className }: TextFieldWithLabelProps) => {
  return (
    <div>
      <TextField
        select={variant === 'select'}
        multiline={variant === 'textarea'}
        minRows={variant === 'textarea' ? 7 : undefined}
        maxRows={variant === 'textarea' ? 7 : undefined}
        variant="outlined"
        type={variant === 'select' || variant === 'textarea' ? undefined : type}
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        label={required ? `${label} *` : label}
        error={Boolean(error)}
        className={className}
        inputProps={{
          maxLength: maxLength ?? 500,
        }}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 'var(--radius-sm)',
          },
          '& .MuiInputBase-input': {
            fontSize: 'var(--text-size-4xs)',
            color: 'var(--color-placeholder-text)',
            ...(variant === 'textarea' && {
              'overflow': 'auto',
              'resize': 'none',
              // Hide scrollbar for Chrome, Safari and Opera
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              // Hide scrollbar for IE, Edge and Firefox
              'msOverflowStyle': 'none',
              'scrollbarWidth': 'none',
            }),
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--color-green-secondary)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--color-green-secondary)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-green-secondary)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-placeholder-text)',
            fontWeight: 400,
            fontSize: 'var(--text-size-4xs)',
            // transform: 'translate(14px, 60%)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-primary)',
          },
          '& .MuiInputLabel-root.Mui-error': {
            color: 'var(--color-placeholder-text)',
          },
          '& input:-webkit-autofill': {
            boxShadow: '0 0 0 1000px transparent inset',
            WebkitTextFillColor: 'var(--color-placeholder-text)',
            transition: 'background-color 5000s ease-in-out 0s',
            color: 'var(--color-placeholder-text)',
          },
        }}
      >
        {variant === 'select'
          && options?.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>

      {/* Error message display below the TextField */}
      {error && (
        <div className="text-red-500 text-size-5xs ml-space-07 mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextFieldWithLabel;
