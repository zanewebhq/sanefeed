'use client';

import { Button, Text } from '@sanefeed/ui';

import styles from './page.module.css';
import { useEffect, useState } from 'react';

const getUser = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response.json();
};

const logout = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  window.location.href = '/';
};

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(({ data }) => setUser(data?.user));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Text as="h1">Welcome to SaneFeed!</Text>

      {user ? (
        <>
          <Text as="p">
            You are logged in as: <b>{user.email}</b>!
          </Text>

          <div className={styles.buttons}>
            <Button onClick={logout}>Log out</Button>
          </div>
        </>
      ) : (
        <div className={styles.buttons}>
          <Button href="/auth/login">Log in</Button>

          <Button href="/auth/signup">Sign up</Button>
        </div>
      )}
    </div>
  );
}
