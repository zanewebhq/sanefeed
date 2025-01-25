import styles from './field-helper.module.css';
import Text from '../text/text';

export type FieldHelperType = 'helper' | 'error';

export interface FieldHelperProps {
  id: string;
  type?: FieldHelperType;
  message: string;
}

export const FieldHelper = ({
  id,
  type = 'helper',
  message,
}: FieldHelperProps) => {
  return (
    <Text id={id} type="ui" as="span" size="sm" className={styles[type]}>
      {message}
    </Text>
  );
};

export default FieldHelper;
