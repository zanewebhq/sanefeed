import { useState } from 'react';
import { cx } from '../../utils';
import FieldIcons from '../field-icons/field-icons';
import FieldWrapper from '../field-wrapper/field-wrapper';
import { IconProps } from '../icon/icon';
import styles from './password-field.module.css';
import PasswordStrengthMeter from '../password-strength-meter/password-strength-meter';

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
  withStrengthMeter?: boolean;
}

export const PasswordField = ({
  name,
  value = '',
  onChange,
  label,
  helper,
  error,
  disabled = false,
  withStrengthMeter = false,
}: PasswordFieldProps) => {
  const helperId = `${name}-helper`;
  const helperMessage = error || helper;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FieldWrapper
      name={name}
      label={label}
      helper={helper}
      error={error}
      disabled={disabled}
    >
      <FieldIcons
        iconLeft="padlock"
        iconRight={showPassword ? 'hide' : 'show'}
        error={!!error}
        onRightIconClick={togglePasswordVisibility}
      />

      <input
        type={showPassword ? 'text' : 'password'}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cx(styles.input, error && styles.error)}
        aria-describedby={helperMessage ? helperId : undefined}
      />

      {withStrengthMeter && <PasswordStrengthMeter value={value} />}
    </FieldWrapper>
  );
};

export default PasswordField;
