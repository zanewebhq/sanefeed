'use client';

import { Button, FormError, Link, TextField } from '@sanefeed/ui';

import styles from '../styles.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import useSendRecoveryCodeForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';
import AuthenticationHeader from '../../components/header';

interface SendRecoveryCodeStepProps {
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  next: () => void;
}

export default function SendRecoveryCodeStep({
  setEmail,
  next,
}: SendRecoveryCodeStepProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useSendRecoveryCodeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/auth/recover/send',
      method: 'POST',
      body: {
        email: data.email,
      },
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFormError(result.message);
    } else {
      setEmail(data.email);
      next();
    }
  };

  return (
    <>
      <AuthenticationHeader
        heading="Forgot password?"
        description="Enter your email address below, and we'll send you a recovery code to
          reset your password."
      />

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

        <FormError error={formError} />

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
