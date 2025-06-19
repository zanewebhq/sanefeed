import { Button, FormError, Icon, Link, Text, TextField } from '@sanefeed/ui';

import styles from '../styles.module.css';
import { Inputs } from '../use-form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface VerifyRecoveryCodeStepProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  formError: string | undefined;
  loading: boolean;
}

export default function VerifyRecoveryCodeStep({
  register,
  errors,
  formError,
  loading,
}: VerifyRecoveryCodeStepProps) {
  return (
    <>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text as="h1" size="4xl">
          Check your email
        </Text>

        <Text as="p">
          We've sent a password recovery code to email@example.com. Please enter
          it below to verify your identity.
        </Text>
      </div>

      <div className={styles.fields}>
        <TextField
          {...register('code')}
          type="text"
          label="Verification code"
          error={errors.code?.message}
        />

        <Text as="p">The code will expire in 1 hour.</Text>

        <div className={styles.group}>
          <div>
            <Text as="p">Didn't receive the code?</Text>
            <Text as="p">
              Check your spam folder or{' '}
              <Link>resend the verification email</Link>.
            </Text>
          </div>

          {formError && <FormError>{formError}</FormError>}

          <Button type="submit" className={styles.button} loading={loading}>
            Verify recovery code
          </Button>

          <Link href="/auth/signup" iconLeft="arrow-back">
            Go back
          </Link>
        </div>
      </div>
    </>
  );
}
