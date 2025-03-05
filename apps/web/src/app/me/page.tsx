'use client';

import { Button, Text } from '@sanefeed/ui';
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

export default function MePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(({ data }) => setUser(data?.user));
  }, []);

  if (!user) {
    return (
      <Text type="heading" as="h1" size="5xl">
        Loading...
      </Text>
    );
  }

  return (
    <div style={{ width: '48rem' }}>
      <Text type="heading" as="h1" size="5xl">
        Hello, {user.email}!
      </Text>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}
