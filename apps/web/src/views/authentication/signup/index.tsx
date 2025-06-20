import SignupForm from './form';
import styles from './styles.module.css';
import { Icon, Link, Text } from '@sanefeed/ui';

export default function SignupView() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text as="h1" size="4xl">
          Get started with SaneFeed
        </Text>

        <Text as="p">
          Join us to take control of your content. Your Content, Your Way!
        </Text>

        <Text as="p">
          Already have an account? <Link href="/auth/login">Log in</Link>
        </Text>
      </div>

      <SignupForm />
    </div>
  );
}
