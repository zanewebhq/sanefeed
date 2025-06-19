import { Button, FormError, Icon, Link, Text, TextField } from '@sanefeed/ui';

import styles from '../styles.module.css';
import { useState } from 'react';
import useSendRecoveryCodeForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';

interface SendRecoveryCodeStepProps {}

export default function SendRecoveryCodeStep({}: SendRecoveryCodeStepProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useSendRecoveryCodeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('data');
    setLoading(true);
  };

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

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
      </form>
    </>
  );
}
