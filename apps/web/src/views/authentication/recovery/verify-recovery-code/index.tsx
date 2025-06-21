'use client';

import { Button, FormError, Link, Text, TextField } from '@sanefeed/ui';

import styles from '../styles.module.css';
import { SubmitHandler } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import useVerifyRecoveryCodeForm, { Inputs } from './use-form';
import request from 'apps/web/src/utils/request';
import AuthenticationHeader from '../../components/header';

interface VerifyRecoveryCodeStepProps {
  next: () => void;
  email: string | undefined;
  setCode: Dispatch<SetStateAction<string | undefined>>;
}

export default function VerifyRecoveryCodeStep({
  next,
  email,
  setCode,
}: VerifyRecoveryCodeStepProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useVerifyRecoveryCodeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/auth/recover/verify',
      method: 'POST',
      body: {
        email: email || '',
        code: data.code,
      },
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFormError(result.message);
    } else {
      setCode(data.code);
      next();
    }
  };

  return (
    <>
      <AuthenticationHeader
        heading="Check your email"
        description="We've sent a password recovery code to email@example.com. Please enter
          it below to verify your identity."
      />

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
              Check your spam folder or <Link>resend the recovery code</Link>.
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
      </form>
    </>
  );
}
