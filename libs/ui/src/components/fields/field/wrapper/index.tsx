'use client';

import { cx } from '../../../../utils';
import styles from './wrapper.module.css';

export interface FieldWrapperProps {
  children: React.ReactNode;
  name: string;
  label?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
}

export const FieldWrapper = ({
  children,
  name,
  disabled = false,
}: FieldWrapperProps) => {
  const focusInput = () => {
    document.getElementById(name)?.focus();
  };

  return (
    <div
      className={cx(
        styles.inputWrapper,
        disabled && styles.inputWrapperDisabled
      )}
      onClick={focusInput}
    >
      {children}
    </div>
  );
};

export default FieldWrapper;
