import { cx } from '../../../../utils';
import Text from '../../../text';
import styles from './label.module.css';

export interface FieldLabelProps {
  id: string;
  label: string;
  bold?: boolean;
}

export const FieldLabel = ({ id, label, bold = false }: FieldLabelProps) => (
  <label htmlFor={id} className={styles.label}>
    <Text className={cx(bold && styles.bold)}>
      {label}
    </Text>
  </label>
);

export default FieldLabel;
