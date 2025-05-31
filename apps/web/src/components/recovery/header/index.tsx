import { Icon, Text } from '@sanefeed/ui';

import styles from './styles.module.css';

export default function VerificationHeader() {
  return (
    <div className={styles.header}>
      <Icon name="logo" size="lg" className={styles.logo} />

      <Text as="h1" size="4xl">
        Forgot password?
      </Text>

      <Text as="p">
        Enter your email address below, and we'll send you a recovery code to
        reset your password.
      </Text>
    </div>
  );
}
