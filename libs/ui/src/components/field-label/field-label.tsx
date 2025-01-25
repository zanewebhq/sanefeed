import Text from '../text/text';
import styles from './field-label.module.css';

export interface FieldLabelProps {
  id: string;
  label: string;
}

export const FieldLabel = ({ id, label }: FieldLabelProps) => (
  <label className={styles.label} htmlFor={id}>
    <Text type="ui" as="span" size="md" className={styles.labelText}>
      {label}
    </Text>
  </label>
);

export default FieldLabel;
