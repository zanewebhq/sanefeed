'use client';

import {
  Button,
  FormError,
  Link,
  PasswordField,
} from '@sanefeed/ui';

import styles from '../styles.module.css';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import useUpdatePasswordForm, { Inputs } from './use-form';
import request from 'apps/web/src/utils/request';
import { useRouter } from 'next/navigation';
import AuthenticationHeader from '../../components/header';

interface UpdatePasswordStepProps {
  email: string | undefined;
  code: string | undefined;
}

export default function UpdatePasswordStep({
  email,
  code,
}: UpdatePasswordStepProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useUpdatePasswordForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/auth/recover',
      method: 'POST',
      body: {
        email: email || '',
        code: code || '',
        password: data.password,
      },
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFormError(result.message);
    } else {
      router.push('/auth/login');
    }
  };

  const password = watch('password');

  return (
    <>
      <AuthenticationHeader
        heading="Enter new password"
        description="Enter your new password. Make sure it is at least 8 characters long
          and includes at least one uppercase letter, a lowercase letter, and a
          digit."
      />

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <PasswordField
          {...register('password')}
          label="Password"
          helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
          error={errors.password?.message}
          watchedPassword={password}
          withStrengthMeter
        />

        {formError && <FormError>{formError}</FormError>}

        <div className={styles.group}>
          <Button type="submit" className={styles.button} loading={loading}>
            Update password
          </Button>

          <Link href="/auth/signup" iconLeft="arrow-back">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}
