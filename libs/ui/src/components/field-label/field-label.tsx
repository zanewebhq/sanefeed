import Text from '../text/text';
import styles from './field-label.module.css';

export interface FieldLabelProps {
  htmlFor: string;
  label: string;
}

export const FieldLabel = ({ htmlFor, label }: FieldLabelProps) => (
  <label className={styles.label} htmlFor={htmlFor}>
    <Text type="ui" as="span" size="md" className={styles.labelText}>
      {label}
    </Text>
  </label>
);

export default FieldLabel;
