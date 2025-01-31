import { cx } from '../../utils';
import Text from '../text/text';
import styles from './field-label.module.css';

export interface FieldLabelProps {
  id: string;
  label: string;
  bold?: boolean;
}

export const FieldLabel = ({ id, label, bold = false }: FieldLabelProps) => (
  <label htmlFor={id} className={styles.label}>
    <Text type="ui" as="span" size="md" className={cx(bold && styles.bold)}>
      {label}
    </Text>
  </label>
);

export default FieldLabel;
