import { Button, FormError, Icon, Link, Text, TextField } from '@sanefeed/ui';

import styles from '../styles.module.css';
import { Inputs } from '../use-form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface SendRecoveryCodeStepProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  formError: string | undefined;
  loading: boolean;
}

export default function SendRecoveryCodeStep({
  register,
  errors,
  formError,
  loading,
}: SendRecoveryCodeStepProps) {
  return (
    <>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text as="h1" size="4xl">
          Forgot password?
        </Text>

        <Text as="p">
          Enter your email address below, and we'll send you a recovery code to
          reset your password.
        </Text>
      </div>

      <div className={styles.fields}>
        <TextField
          {...register('email')}
          type="email"
          label="Email"
          placeholder="email@example.com"
          iconLeft="mail"
          error={errors.email?.message}
        />

        {formError && <FormError>{formError}</FormError>}

        <div className={styles.group}>
          <Button type="submit" className={styles.button} loading={loading}>
            Send recovery code
          </Button>

          <Link href="/auth/signup" iconLeft="arrow-back">
            Go back
          </Link>
        </div>
      </div>
    </>
  );
}
