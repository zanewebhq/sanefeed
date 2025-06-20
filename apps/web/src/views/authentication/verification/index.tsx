import { Icon, Text } from '@sanefeed/ui';
import styles from './styles.module.css';
import EmailVerificationForm from './form';

export default function EmailVerificationView() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text as="h1" size="4xl">
          Verify your email address
        </Text>

        <Text as="p">
          To complete your signup, please verify your email address by entering
          the verification code we just sent to email@example.com.
        </Text>
      </div>

      <EmailVerificationForm />
    </div>
  );
}
