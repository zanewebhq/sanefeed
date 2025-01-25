import { cx } from '../../utils';
import Icon, { IconProps } from '../icon/icon';
import Text from '../text/text';
import styles from './text-field.module.css';

interface GetInputPaddingClassesParams {
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  error?: string;
}

const getInputPaddingClasses = ({
  iconLeft,
  iconRight,
  error,
}: GetInputPaddingClassesParams) => {
  const classes = [];

  if (iconLeft) {
    classes.push(styles.inputWithIconLeft);
  }

  if (iconRight && error) {
    classes.push(styles.inputWithDoubleIconRight);
  } else if (iconRight || error) {
    classes.push(styles.inputWithIconRight);
  }

  return classes;
};

export interface TextFieldProps {
  name: string;
  type?: 'text' | 'email';
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export const TextField = ({
  name,
  type = 'text',
  label,
  placeholder,
  helper,
  error,
  iconLeft,
  iconRight,
}: TextFieldProps) => {
  const helperId = `${name}-helper`;

  const inputPaddingClasses = getInputPaddingClasses({
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

      <div className={styles.inputWrapper} onClick={focusInput}>
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
          className={cx(styles.input, ...inputPaddingClasses)}
          aria-describedby={helperId}
        />

        <div className={cx(styles.icons, styles.iconsRight)}>
          {iconRight && <Icon name={iconRight} size="md" />}

          {error && (
            <Icon name="error" size="md" className={styles.errorIcon} />
          )}
        </div>
      </div>

      {helper && (
        <Text
          id={helperId}
          type="ui"
          as="span"
          size="sm"
          className={styles.helper}
        >
          {helper}
        </Text>
      )}
    </div>
  );
};

export default TextField;
