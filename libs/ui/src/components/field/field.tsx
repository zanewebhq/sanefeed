import FieldHelper from '../field-helper/field-helper';
import FieldIcons from '../field-icons/field-icons';
import FieldLabel from '../field-label/field-label';
import FieldWrapper from '../field-wrapper/field-wrapper';
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
