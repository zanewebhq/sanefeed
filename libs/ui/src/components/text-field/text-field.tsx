import { cx } from '../../utils';
import FieldIcons from '../field-icons/field-icons';
import FieldWrapper from '../field-wrapper/field-wrapper';
import { IconProps } from '../icon/icon';
import styles from './text-field.module.css';
import { getInputClasses } from '../../utils';

export interface TextFieldProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email';
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export const TextField = ({
  name,
  value = '',
  onChange,
  type = 'text',
  label,
  placeholder,
  helper,
  error,
  disabled = false,
  iconLeft,
  iconRight,
}: TextFieldProps) => {
  const helperId = `${name}-helper`;
  const helperMessage = error || helper;

  const inputClasses = getInputClasses({
    iconLeft: !!iconLeft,
    iconRight: !!iconRight,
    error: !!error,
    styles: {
      leftIconPadding: styles.leftIconPadding,
      doubleIconPadding: styles.doubleIconPadding,
      rightIconPadding: styles.rightIconPadding,
      inputError: styles.inputError,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <FieldWrapper
      name={name}
      label={label}
      helper={helper}
      error={error}
      disabled={disabled}
    >
      <FieldIcons iconLeft={iconLeft} iconRight={iconRight} error={!!error} />

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cx(styles.input, ...inputClasses)}
        aria-describedby={helperMessage ? helperId : undefined}
      />
    </FieldWrapper>
  );
};

export default TextField;
