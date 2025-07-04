'use client';

import { cx } from '../../../utils';
import Field from '../../fields/field';
import { IconProps } from '../../icon';
import styles from './text.module.css';

export interface TextFieldProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email';
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
}

export const TextField = ({
  name,
  value,
  defaultValue,
  onChange,
  type = 'text',
  label,
  placeholder,
  helper,
  error,
  disabled = false,
  iconLeft,
  iconRight,
  ref,
  className,
}: TextFieldProps) => {
  const helperId = `${name}-helper`;
  const helperType = error ? 'error' : 'helper';
  const helperMessage = error || helper;

  return (
    <Field className={className}>
      {label && <Field.Label id={name} label={label} bold />}

      <Field.Wrapper name={name} disabled={disabled}>
        <Field.Icons
          iconLeft={iconLeft}
          iconRight={iconRight}
          error={!!error}
        />

        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className={cx(styles.input, error && styles.error)}
          ref={ref}
        />
      </Field.Wrapper>

      {helperMessage && (
        <Field.Helper id={helperId} type={helperType} message={helperMessage} />
      )}
    </Field>
  );
};

export default TextField;
