import Text from '../text/text';
import styles from './form-error.module.css';

export interface FormErrorProps {
  children: React.ReactNode;
}

export const FormError = ({ children }: FormErrorProps) => (
  <div className={styles.formError}>
    <Text type="body" as="span" size="sm" className={styles.text}>
      {children}
    </Text>
  </div>
);

export default FormError;
