import Icon, { IconProps } from '../icon/icon';
import Text from '../text/text';
import styles from './text-field.module.css';

export interface TextFieldProps {
  name: string;
  type?: 'text' | 'email';
  label?: string;
  placeholder?: string;
  helper?: string;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export const TextField = ({
  name,
  type = 'text',
  label,
  placeholder,
  helper,
  iconLeft,
  iconRight,
}: TextFieldProps) => {
  const helperId = `${name}-helper`;

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
        {iconLeft && <Icon name={iconLeft} size="md" className={styles.icon} />}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles.input}
          aria-describedby={helperId}
        />
        {iconRight && (
          <Icon name={iconRight} size="md" className={styles.icon} />
        )}
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
