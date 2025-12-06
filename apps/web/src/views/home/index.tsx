'use client';

import { Button, Text } from '@sanefeed/ui';
import styles from './styles.module.css';
import request from '../../utils/request';
import { useState } from 'react';
import { redirect } from 'next/navigation';

interface HomeViewProps {
  user: any;
}

export default function HomeView({ user }: HomeViewProps) {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);

    await request({
      endpoint: '/auth/logout',
    });

    redirect('/');
  };

  return (
    <div className={styles.wrapper}>
      <Text as="h1">Welcome to SaneFeed!</Text>

      {user ? (
        <>
          <Text as="p">
            You are logged in as: <b>{user.email}</b>!
          </Text>

          <div className={styles.buttons}>
            <Button onClick={logout} loading={loading} variant="secondary">
              Log out
            </Button>

            <Button href="/app" loading={loading}>
              Go to app
            </Button>
          </div>
        </>
      ) : (
        <div className={styles.buttons}>
          <Button href="/auth/login" variant="secondary">
            Log in
          </Button>

          <Button href="/auth/signup">Sign up</Button>
        </div>
      )}
    </div>
  );
}
