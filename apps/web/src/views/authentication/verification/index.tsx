import EmailVerificationForm from './form';
import AuthenticationHeader from '../components/header';
import AuthenticationWrapper from '../components/wrapper';
import { Text } from '@sanefeed/ui';

export default function EmailVerificationView() {
  return (
    <AuthenticationWrapper>
      <AuthenticationHeader heading="Verify your email address">
        <Text as="p">A verification code has been sent to your email.</Text>
        <Text as="p">Enter it below to complete your signup.</Text>
      </AuthenticationHeader>

      <EmailVerificationForm />
    </AuthenticationWrapper>
  );
}
