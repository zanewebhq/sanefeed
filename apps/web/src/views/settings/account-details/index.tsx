'use client';

import { Link, PasswordField, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';

interface AccountDetailsProps {
  user: { id: number; email: string };
}

export default function AccountDetails({ user }: AccountDetailsProps) {
  const changeEmail = () => {
    console.log('Change email');
  };

  const changePassword = () => {
    console.log('Change password');
  };

  return (
    <div className={styles.wrapper}>
      <Text as="h2" size="2xl">
        Account Details
      </Text>

      <div className={styles.fieldGroup}>
        <TextField
          name="email"
          type="email"
          label="Email address"
          iconLeft="mail"
          value={user.email}
          className={styles.field}
          disabled
        />

        <div className={styles.linkWrapper}>
          <Link onClick={changeEmail}>Change email</Link>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <TextField
          name="password"
          label="Password"
          iconLeft="padlock"
          value="••••••••"
          className={styles.field}
          disabled
        />

        <div className={styles.linkWrapper}>
          <Link onClick={changePassword}>Change password</Link>
        </div>
      </div>
    </div>
  );
}
