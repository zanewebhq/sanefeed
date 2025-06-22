'use client';

import { Button, Text } from '@sanefeed/ui';
import styles from './styles.module.css';

interface DeleteAccountProps {
  user: { id: number; email: string };
}

export default function DeleteAccount({ user }: DeleteAccountProps) {
  const deleteAccount = () => {
    console.log('Delete account');
  };

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
        <Text as="p" className={styles.warning}>
          WARNING: This action is irreversible!
        </Text>
      </div>

      <Button
        type="button"
        theme="red"
        iconLeft="trash"
        onClick={deleteAccount}
        className={styles.button}
      >
        Delete account
      </Button>
    </div>
  );
}
