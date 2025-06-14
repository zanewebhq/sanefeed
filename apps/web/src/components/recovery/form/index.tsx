'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button, FormError, Link, TextField } from '@sanefeed/ui';

import styles from './styles.module.css';
import useRecoveryForm, { Inputs } from './use-form';

export default function RecoveryForm() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const methods = useRecoveryForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/recover`,
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
        console.log(result);
        // router.push('/');
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
  );
}
