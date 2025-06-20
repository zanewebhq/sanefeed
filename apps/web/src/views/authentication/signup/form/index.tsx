'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button, FormError, PasswordField, TextField } from '@sanefeed/ui';

import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import useSignupForm, { Inputs } from './use-form';
import request from 'apps/web/src/utils/request';

export default function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useSignupForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const password = watch('password');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/auth/signup',
      method: 'POST',
      body: {
        email: data.email,
        password: data.password,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      setLoading(false);
      setFormError(result.message);
    } else {
      router.push('/auth/verify');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.group}>
        <TextField
          {...register('email')}
          type="email"
          label="Email"
          placeholder="email@example.com"
          iconLeft="mail"
          error={errors.email?.message}
        />

        <PasswordField
          {...register('password')}
          label="Password"
          error={errors.password?.message}
          forgotPasswordLink="/auth/recover"
          helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
          watchedPassword={password}
          withStrengthMeter
        />
      </div>

      <div className={styles.group}>
        {formError && <FormError>{formError}</FormError>}

        <Button type="submit" className={styles.button} loading={loading}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
