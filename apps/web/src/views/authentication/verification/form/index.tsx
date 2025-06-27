'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button, FormError, Link, Text, TextField } from '@sanefeed/ui';

import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import useEmailVerificationForm, { Inputs } from './use-form';
import request from 'apps/web/src/utils/request';

export default function EmailVerificationForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const methods = useEmailVerificationForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/auth/verify',
      method: 'POST',
      body: {
        code: data.code,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      setFormError(result.message);
    } else {
      router.push('/');
    }
  };

  const handleResend = async () => {
    const response = await request({
      endpoint: '/auth/verify/resend',
      method: 'GET',
    });

    const result = await response.json();

    if (!response.ok) {
      setFormError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <TextField
        {...register('code')}
        type="text"
        label="Verification code"
        error={errors.code?.message}
      />

      <Text as="p">The code will expire in 24 hours.</Text>

      <div className={styles.group}>
        <div>
          <Text as="p">Didn't receive the code?</Text>
          <Text as="p">
            Check your spam folder or{' '}
            <Link onClick={handleResend}>resend the verification email</Link>.
          </Text>
        </div>

        <FormError error={formError} />

        <Button type="submit" className={styles.button} loading={loading}>
          Verify Email
        </Button>

        <Link href="/auth/signup" iconLeft="arrow-back">
          Go back
        </Link>
      </div>
    </form>
  );
}
