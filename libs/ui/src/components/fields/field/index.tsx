import FieldHelper from './helper';
import FieldIcons from './icons';
import FieldLabel from './label';
import FieldWrapper from './wrapper';
import styles from './field.module.css';
import { cx } from 'libs/ui/src/utils';

export interface FieldProps {
  children: React.ReactNode;
  className?: string;
}

export const Field = ({ children, className }: FieldProps) => {
  return <div className={cx(styles.field, className)}>{children}</div>;
};

Field.Label = FieldLabel;
Field.Helper = FieldHelper;
Field.Wrapper = FieldWrapper;
Field.Icons = FieldIcons;

export default Field;
