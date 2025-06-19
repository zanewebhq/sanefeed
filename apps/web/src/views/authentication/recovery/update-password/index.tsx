'use client';

import {
  Button,
  FormError,
  Icon,
  Link,
  PasswordField,
  Text,
} from '@sanefeed/ui';

import styles from '../styles.module.css';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import useUpdatePasswordForm, { Inputs } from './use-form';

interface UpdatePasswordStepProps {}

export default function UpdatePasswordStep({}: UpdatePasswordStepProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useUpdatePasswordForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
  };

  const password = watch('password');

  return (
    <>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text as="h1" size="4xl">
          Enter new password
        </Text>

        <Text as="p">
          Enter your new password. Make sure it is at least 8 characters long
          and includes at least one uppercase letter, a lowercase letter, and a
          digit.
        </Text>
      </div>

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
