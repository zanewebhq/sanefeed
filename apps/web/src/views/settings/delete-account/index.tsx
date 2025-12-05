'use client';

import { Button, Text } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import DeleteAccountDialog from './dialog';

export default function DeleteAccount() {
  const [isDeleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const onDeleteAccountOpen = () => setDeleteAccountOpen(true);
  const onDeleteAccountClose = () => setDeleteAccountOpen(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <Text as="h2" size="2xl">
          Delete account
        </Text>

        <Text as="p">
          If you no longer want to use SaneFeed, you can permanently delete your
          account.
        </Text>
      </div>

      <Button
        type="button"
        theme="red"
        iconLeft="trash"
        onClick={onDeleteAccountOpen}
        className={styles.button}
      >
        Delete account
      </Button>

      <DeleteAccountDialog
        isOpen={isDeleteAccountOpen}
        onClose={onDeleteAccountClose}
      />
    </div>
  );
}
