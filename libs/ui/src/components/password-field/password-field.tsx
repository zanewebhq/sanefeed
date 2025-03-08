'use client';

import { useState } from 'react';
import { cx } from '../../utils';
import { IconProps } from '../icon/icon';
import styles from './password-field.module.css';
import PasswordStrengthMeter from '../password-strength-meter/password-strength-meter';
import Field from '../field/field';

export interface PasswordFieldProps {
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  withStrengthMeter?: boolean;
  watchedPassword?: string;
  forgotPasswordLink?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const PasswordField = ({
  name,
  value,
  onChange,
  label,
  helper,
  error,
  disabled = false,
  withStrengthMeter = false,
  watchedPassword,
  forgotPasswordLink,
  ref,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const helperId = `${name}-helper`;
  const helperType = error ? 'error' : 'helper';
  const helperMessage = error
    ? error
    : !watchedPassword && helper
    ? helper
    : undefined;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Field>
      <div className={styles.top}>
        {label && <Field.Label id={name} label={label} bold />}

        {forgotPasswordLink && (
          <a href={forgotPasswordLink} className={styles.link}>
            Forgot password?
          </a>
        )}
      </div>

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
          onChange={onChange}
          disabled={disabled}
          className={cx(styles.input, error && styles.error)}
          ref={ref}
        />
      </Field.Wrapper>

      {withStrengthMeter && (
        <PasswordStrengthMeter
          name={name}
          value={watchedPassword}
          showHint={!helperMessage}
        />
      )}

      {helperMessage && (
        <Field.Helper id={helperId} message={helperMessage} type={helperType} />
      )}
    </Field>
  );
};

export default PasswordField;
