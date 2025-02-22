'use client';

import { Text } from '@sanefeed/ui';
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
    <Text type="heading" as="h1" size="5xl">
      Hello, {user.email}!
    </Text>
  );
}
