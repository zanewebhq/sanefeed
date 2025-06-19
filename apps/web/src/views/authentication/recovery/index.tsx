'use client';

import { Button, FormError, Icon, Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import usePasswordRecoveryForm, { Inputs } from './use-form';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import SendRecoveryCodeStep from './send-recovery-code';
import VerifyRecoveryCodeStep from './verify-recovery-code';

export default function PasswordRecoveryView() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <VerifyRecoveryCodeStep
        register={register}
        errors={errors}
        formError={formError}
        loading={loading}
      />
    </form>
  );
}
