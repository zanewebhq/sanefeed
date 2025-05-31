import { Icon, Text } from '@sanefeed/ui';

import styles from './styles.module.css';

export default function VerificationHeader() {
  return (
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
  );
}
