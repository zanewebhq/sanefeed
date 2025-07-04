import AuthenticationHeader from '../components/header';
import AuthenticationWrapper from '../components/wrapper';
import LoginForm from './form';
import { Link, Text } from '@sanefeed/ui';

export default function LoginView() {
  return (
    <AuthenticationWrapper>
      <AuthenticationHeader
        heading="Welcome back to SaneFeed"
        description="Log in to continue enjoying your content, your way!"
      >
        <Text as="p">
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </Text>
      </AuthenticationHeader>

      <LoginForm />
    </AuthenticationWrapper>
  );
}
