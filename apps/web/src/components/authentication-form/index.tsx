'use client';

import {
  Button,
  Icon,
  Link,
  PasswordField,
  Text,
  TextField,
} from '@sanefeed/ui';

import styles from './styles.module.css';

export default function AuthenticationForm() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text type="heading" as="h1" size="4xl">
          Get started with SaneFeed
        </Text>

        <Text>
          Join us to take control of your content. Your Content, Your Way!
        </Text>

        <Text>
          Already have an account? <Link href="/login">Log in</Link>
        </Text>
      </div>

      <form className={styles.form}>
        <TextField
          name="email"
          type="email"
          label="Email"
          placeholder="email@example.com"
        />

        <PasswordField
          name="password"
          label="Password"
          helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
        />

        <Button type="submit" className={styles.button}>
          Sign up
        </Button>
      </form>
    </div>
  );
}
