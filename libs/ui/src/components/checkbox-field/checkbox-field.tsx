import Field from '../field/field';
import Icon from '../icon/icon';
import styles from './checkbox-field.module.css';

export interface CheckboxFieldProps {
  name: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
}

export const CheckboxField = ({
  name,
  checked = false,
  onChange,
  label,
  disabled = false,
}: CheckboxFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  
  return (
    <div className={styles.field}>
      {checked && <Icon name="checkmark" className={styles.checkmark} />}

      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkbox}
      />

      {label && <Field.Label id={name} label={label} />}
    </div>
  );
};

export default CheckboxField;
