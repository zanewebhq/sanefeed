import { cx } from '../../utils';
import FieldHelper from '../field-helper/field-helper';
import FieldLabel from '../field-label/field-label';
import Icon, { IconProps } from '../icon/icon';
import Text from '../text/text';
import styles from './text-field.module.css';

interface GetInputClassesParams {
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  error?: string;
}

const getInputClasses = ({
  iconLeft,
  iconRight,
  error,
}: GetInputClassesParams) => {
  const classes = [];

  if (iconLeft) {
    classes.push(styles.inputWithIconLeft);
  }

  if (iconRight && error) {
    classes.push(styles.inputWithDoubleIconRight);
  } else if (iconRight || error) {
    classes.push(styles.inputWithIconRight);
  }

  if (error) {
    classes.push(styles.inputError);
  }

  return classes;
};

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
  value,
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

  const focusInput = () => {
    document.getElementById(name)?.focus();
  };

  return (
    <div className={styles.field}>
      {label && <FieldLabel id={name} label={label} />}

      <div
        className={cx(
          styles.inputWrapper,
          disabled && styles.inputWrapperDisabled
        )}
        onClick={focusInput}
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
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={cx(styles.input, ...inputClasses)}
          aria-describedby={helperId}
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
