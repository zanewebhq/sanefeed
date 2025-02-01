'use client';

import Field from '../field/field';
import Icon from '../icon/icon';
import styles from './checkbox-field.module.css';

export interface CheckboxFieldProps {
  name: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
}

export const CheckboxField = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxFieldProps) => {
  return (
    <div className={styles.field}>
      {checked && <Icon name="checkmark" className={styles.checkmark} />}

      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.checkbox}
      />

      {label && <Field.Label id={name} label={label} />}
    </div>
  );
};

export default CheckboxField;
