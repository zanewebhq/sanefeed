'use client';

import { Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import ChangeEmailDialog from './change-email';
import ChangePasswordDialog from './change-password';

interface AccountDetailsProps {
  user: { id: number; email: string };
}

export default function AccountDetails({ user }: AccountDetailsProps) {
  const [isChangeEmailOpen, setChangeEmailOpen] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);

  const onChangeEmailOpen = () => setChangeEmailOpen(true);
  const onChangeEmailClose = () => setChangeEmailOpen(false);

  const onChangePasswordOpen = () => setChangePasswordOpen(true);
  const onChangePasswordClose = () => setChangePasswordOpen(false);

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
          <Link onClick={onChangeEmailOpen}>Change email</Link>
        </div>

        <ChangeEmailDialog
          isOpen={isChangeEmailOpen}
          onClose={onChangeEmailClose}
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
          <Link onClick={onChangePasswordOpen}>Change password</Link>
        </div>

        <ChangePasswordDialog
          isOpen={isChangePasswordOpen}
          onClose={onChangePasswordClose}
        />
      </div>
    </div>
  );
}
