import LoginForm from './form';
import styles from './styles.module.css';
import { Icon, Link, Text } from '@sanefeed/ui';

export default function LoginView() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text as="h1" size="4xl">
          Welcome back to SaneFeed
        </Text>

        <Text as="p">Log in to continue enjoying your content, your way!</Text>

        <Text as="p">
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </Text>
      </div>

      <LoginForm />
    </div>
  );
}
