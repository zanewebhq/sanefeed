import AuthenticationHeader from '../components/header';
import AuthenticationWrapper from '../components/wrapper';
import SignupForm from './form';
import { Link, Text } from '@sanefeed/ui';

export default function SignupView() {
  return (
    <AuthenticationWrapper>
      <AuthenticationHeader
        heading="Get started with SaneFeed"
        description="Join us to take control of your content. Your Content, Your Way!"
      >
        <Text as="p">
          Already have an account? <Link href="/auth/login">Log in</Link>
        </Text>
      </AuthenticationHeader>

      <SignupForm />
    </AuthenticationWrapper>
  );
}
