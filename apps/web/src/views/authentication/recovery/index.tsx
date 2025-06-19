'use client';

import { Button, FormError, Icon, Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import usePasswordRecoveryForm, { Inputs } from './use-form';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function PasswordRecoveryView() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const methods = usePasswordRecoveryForm();

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
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}
