import { cx } from '../../utils';
import FieldHelper from '../field-helper/field-helper';
import FieldLabel from '../field-label/field-label';
import Icon, { IconProps } from '../icon/icon';
import styles from './text-field.module.css';
import { focusInput, getInputClasses } from './utils';

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
  const helperType = error ? 'error' : 'helper';

  const inputClasses = getInputClasses({
    iconLeft,
    iconRight,
    error,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.field}>
      {label && <FieldLabel id={name} label={label} />}

      <div
        className={cx(
          styles.inputWrapper,
          disabled && styles.inputWrapperDisabled
        )}
        onClick={() => focusInput(name)}
      >
        {iconLeft && (
          <div className={cx(styles.icons, styles.iconsLeft)}>
            <Icon name={iconLeft} size="md" />
          </div>
        )}

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

        <div className={cx(styles.icons, styles.iconsRight)}>
          {iconRight && <Icon name={iconRight} size="md" />}

          {error && (
            <Icon name="error" size="md" className={styles.iconError} />
          )}
        </div>
      </div>

      {helperMessage && (
        <FieldHelper id={helperId} type={helperType} message={helperMessage} />
      )}
    </div>
  );
};

export default TextField;