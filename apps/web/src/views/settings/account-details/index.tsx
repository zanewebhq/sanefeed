'use client';

import { Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import ChangeEmailDialog from './change-email';

interface AccountDetailsProps {
  user: { id: number; email: string };
}

export default function AccountDetails({ user }: AccountDetailsProps) {
  const [isChangeEmailOpen, setChangeEmailOpen] = useState(false);

  const onEmailChangeOpen = () => setChangeEmailOpen(true);
  const onEmailChangeClose = () => setChangeEmailOpen(false);

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
          <Link onClick={onEmailChangeOpen}>Change email</Link>
        </div>

        <ChangeEmailDialog
          isOpen={isChangeEmailOpen}
          onClose={onEmailChangeClose}
        />
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
