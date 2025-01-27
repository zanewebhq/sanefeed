import { cx } from '../../utils';
import FieldHelper from '../field-helper/field-helper';
import FieldLabel from '../field-label/field-label';
import styles from './field-wrapper.module.css';

export interface FieldWrapperProps {
  children: React.ReactNode[];
  name: string;
  label?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
}

export const FieldWrapper = ({
  children,
  name,
  label,
  helper,
  error,
  disabled = false,
}: FieldWrapperProps) => {
  const helperId = `${name}-helper`;
  const helperMessage = error || helper;
  const helperType = error ? 'error' : 'helper';

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
        {children}
      </div>

      {helperMessage && (
        <FieldHelper id={helperId} type={helperType} message={helperMessage} />
      )}
    </div>
  );
};

export default FieldWrapper;
