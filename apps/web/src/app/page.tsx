import { Button, Text } from '@sanefeed/ui';

import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Text type="heading" as="h1" size="5xl">
        Welcome to SaneFeed!
      </Text>

      <div className={styles.buttons}>
        <Button href="/auth/login">Log in</Button>

        <Button href="/auth/signup">Sign up</Button>
      </div>
    </div>
  );
}
