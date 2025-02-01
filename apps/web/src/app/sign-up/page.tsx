import styles from './page.module.css';
import AuthenticationForm from '../../components/authentication-form';

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <AuthenticationForm />
    </div>
  );
}
