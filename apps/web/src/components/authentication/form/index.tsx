'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, FormError, PasswordField, TextField } from '@sanefeed/ui';

import styles from './styles.module.css';

const CONFIG = {
  login: {
    endpoint: '/login',
    submitText: 'Log in',
    withStrengthMeter: false,
    passwordHelper: undefined,
  },
  signup: {
    endpoint: '/signup',
    submitText: 'Sign Up',
    withStrengthMeter: true,
    passwordHelper: 'Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit',
  },
};

interface Inputs {
  email: string;
  password: string;
}

const defaultValues: Inputs = {
  email: '',
  password: '',
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

interface AuthenticationFormProps {
  type: 'login' | 'signup';
}

export default function AuthenticationForm({ type }: AuthenticationFormProps) {
  const { endpoint, submitText, withStrengthMeter, passwordHelper } =
    CONFIG[type];

  const [formError, setFormError] = useState<string | null>(null);
  const methods = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const watchedPassword = watch('password');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setFormError(result.message);
      }

      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      setFormError('An error occurred on the server. Please try again later.');
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
          helper={passwordHelper}
          error={errors.password?.message}
          watchedPassword={watchedPassword}
          withStrengthMeter={withStrengthMeter}
        />
      </div>

      <div className={styles.group}>
        {formError && <FormError>{formError}</FormError>}

        <Button type="submit" className={styles.button}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}
