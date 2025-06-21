import styles from './styles.module.css';
import EmailVerificationForm from './form';
import AuthenticationHeader from '../components/header';

export default function EmailVerificationView() {
  return (
    <div className={styles.wrapper}>
      <AuthenticationHeader
        heading="Verify your email address"
        description="To complete your signup, please verify your email address by entering
          the verification code we just sent to email@example.com."
      />

      <EmailVerificationForm />
    </div>
  );
}
