'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  FormError,
  Link,
  Text,
  TextField,
} from '@sanefeed/ui';

import styles from './styles.module.css';

interface Inputs {
  code: string;
}

const defaultValues: Inputs = {
  code: '',
};

const schema = z.object({
  code: z
    .string()
    .min(1, 'Verification code is required.')
    .min(6, 'Verification code must be 6 characters.')
    .max(6, 'Verification code must be 6 characters.'),
});

export default function VerificationForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  const handleResend = () => {
    console.log('Resending verification code...');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <TextField
        {...register('code')}
        type="text"
        label="Verification code"
        error={errors.code?.message}
      />

      <Text>The code will expire in 09:59</Text>

      <div className={styles.group}>
        <div>
          <Text>Didn't receive the code?</Text>
          <Text>
            Check your spam folder or{' '}
            <Link onClick={handleResend}>resend verification email</Link>
          </Text>
        </div>

        {formError && <FormError>{formError}</FormError>}

        <Button type="submit" className={styles.button}>
          Verify Email
        </Button>

        <Link href="/auth/signup" iconLeft="arrow-back">
          Go back
        </Link>
      </div>
    </form>
  );
}
