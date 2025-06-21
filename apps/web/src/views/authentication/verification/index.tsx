import EmailVerificationForm from './form';
import AuthenticationHeader from '../components/header';
import AuthenticationWrapper from '../components/wrapper';

export default function EmailVerificationView() {
  return (
    <AuthenticationWrapper>
      <AuthenticationHeader
        heading="Verify your email address"
        description="To complete your signup, please verify your email address by entering
          the verification code we just sent to email@example.com."
      />

      <EmailVerificationForm />
    </AuthenticationWrapper>
  );
}
