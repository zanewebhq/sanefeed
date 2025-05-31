import styles from './helper.module.css';
import Text from '../../../text';
import { cx } from '../../../../utils';

export type FieldHelperType = 'helper' | 'error';

export interface FieldHelperProps {
  id: string;
  type?: FieldHelperType;
  message: string;
  className?: string;
}

export const FieldHelper = ({
  id,
  type,
  message,
  className,
}: FieldHelperProps) => {
  const classes = cx(type && styles[type], className);

  return (
    <Text id={id} size="sm" className={classes}>
      {message}
    </Text>
  );
};

export default FieldHelper;
