'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button, FormError, Link, Text, TextField } from '@sanefeed/ui';

import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import useVerificationForm, { Inputs } from './use-form';

export default function VerificationForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const methods = useVerificationForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setLoading(false);
        setFormError(result.message);
      } else {
        router.push('/me');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setFormError('An error occurred on the server. Please try again later.');
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setLoading(false);
        setFormError(result.message);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setFormError('An error occurred on the server. Please try again later.');
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

      <Text>The code will expire in 24 hours.</Text>

      <div className={styles.group}>
        <div>
          <Text>Didn't receive the code?</Text>
          <Text>
            Check your spam folder or{' '}
            <Link onClick={handleResend}>resend the verification email</Link>.
          </Text>
        </div>

        {formError && <FormError>{formError}</FormError>}

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
