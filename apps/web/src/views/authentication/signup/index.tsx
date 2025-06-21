import AuthenticationHeader from '../components/header';
import SignupForm from './form';
import styles from './styles.module.css';
import { Link, Text } from '@sanefeed/ui';

export default function SignupView() {
  return (
    <div className={styles.wrapper}>
      <AuthenticationHeader
        heading="Get started with SaneFeed"
        description="Join us to take control of your content. Your Content, Your Way!"
      >
        <Text as="p">
          Already have an account? <Link href="/auth/login">Log in</Link>
        </Text>
      </AuthenticationHeader>

      <SignupForm />
    </div>
  );
}
