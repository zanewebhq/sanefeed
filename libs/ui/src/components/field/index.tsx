import FieldHelper from './helper';
import FieldIcons from './icons';
import FieldLabel from './label';
import FieldWrapper from './wrapper';
import styles from './field.module.css';

export interface FieldProps {
  children: React.ReactNode;
}

export const Field = ({ children }: FieldProps) => {
  return <div className={styles.field}>{children}</div>;
};

Field.Label = FieldLabel;
Field.Helper = FieldHelper;
Field.Wrapper = FieldWrapper;
Field.Icons = FieldIcons;

export default Field;
