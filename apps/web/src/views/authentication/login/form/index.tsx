'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button, FormError, PasswordField, TextField } from '@sanefeed/ui';

import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import useLoginForm, { Inputs } from './use-form';
import request from 'apps/web/src/utils/request';

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useLoginForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/auth/login',
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
      router.push('/');
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
        />
      </div>

      <div className={styles.group}>
        {formError && <FormError>{formError}</FormError>}

        <Button type="submit" className={styles.button} loading={loading}>
          Log in
        </Button>
      </div>
    </form>
  );
}
