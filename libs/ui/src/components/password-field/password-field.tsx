import { cx } from '../../utils';
import FieldIcons from '../field-icons/field-icons';
import FieldWrapper from '../field-wrapper/field-wrapper';
import Icon, { IconProps } from '../icon/icon';
import styles from './password-field.module.css';
import { getInputClasses } from '../../utils';

export interface PasswordFieldProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export const PasswordField = ({
  name,
  value = '',
  onChange,
  label,
  helper,
  error,
  disabled = false,
}: PasswordFieldProps) => {
  const helperId = `${name}-helper`;
  const helperMessage = error || helper;

  const inputClasses = getInputClasses({
    iconLeft: true,
    iconRight: true,
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
      <FieldIcons iconLeft="padlock" iconRight="show" error={!!error} />

      <input
        type="password"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cx(styles.input, ...inputClasses)}
        aria-describedby={helperMessage ? helperId : undefined}
      />
    </FieldWrapper>
  );
};

export default PasswordField;
