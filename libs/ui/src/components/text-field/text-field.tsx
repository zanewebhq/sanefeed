import { cx } from '../../utils';
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
      {label && (
        <label className={styles.label} htmlFor={name}>
          <Text type="ui" as="span" size="md" className={styles.labelText}>
            {label}
          </Text>
        </label>
      )}

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

      {(error || helper) && (
        <Text
          id={helperId}
          type="ui"
          as="span"
          size="sm"
          className={cx(styles.helper, error && styles.error)}
        >
          {error || helper}
        </Text>
      )}
    </div>
  );
};

export default TextField;
