import { useState } from 'react';
import { cx } from '../../utils';
import { IconProps } from '../icon/icon';
import styles from './password-field.module.css';
import PasswordStrengthMeter from '../password-strength-meter/password-strength-meter';
import Field from '../field/field';

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
  const [showPassword, setShowPassword] = useState(false);

  const helperId = `${name}-helper`;
  const helperType = error ? 'error' : 'helper';
  const helperMessage = error ? error : !value && helper ? helper : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Field>
      {label && <Field.Label id={name} label={label} bold />}

      <Field.Wrapper name={name} disabled={disabled}>
        <Field.Icons
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
        />
      </Field.Wrapper>

      {withStrengthMeter && (
        <PasswordStrengthMeter
          name={name}
          value={value}
          showHint={!helperMessage}
        />
      )}

      {helperMessage && (
        <Field.Helper
          id={helperId}
          message={helperMessage}
          type={!withStrengthMeter ? helperType : undefined}
        />
      )}
    </Field>
  );
};

export default PasswordField;
