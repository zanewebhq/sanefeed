import Text from '../text';
import styles from './form-error.module.css';

export interface FormErrorProps {
  error?: string | null;
}

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) {
    return null;
  }

  return (
    <div className={styles.formError}>
      <Text type="body" size="sm" className={styles.text}>
        {error}
      </Text>
    </div>
  );
};

export default FormError;
