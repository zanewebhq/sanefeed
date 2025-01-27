import { cx } from '../../utils';
import FieldHelper from '../field-helper/field-helper';
import FieldLabel from '../field-label/field-label';
import FieldWrapper from '../field-wrapper/field-wrapper';
import Icon, { IconProps } from '../icon/icon';
import styles from './password-field.module.css';
import { focusInput, getInputClasses } from './utils';

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
    iconLeft: 'padlock',
    iconRight: 'show',
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
      <div className={cx(styles.icons, styles.iconsLeft)}>
        <Icon name="padlock" size="md" />
      </div>

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

      <div className={cx(styles.icons, styles.iconsRight)}>
        <Icon name="show" size="md" />

        {error && <Icon name="error" size="md" className={styles.iconError} />}
      </div>
    </FieldWrapper>
  );
};

export default PasswordField;
