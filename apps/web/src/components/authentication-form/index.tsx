'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  FormError,
  Icon,
  Link,
  PasswordField,
  Text,
  TextField,
} from '@sanefeed/ui';

import styles from './styles.module.css';

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

export default function AuthenticationForm() {
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
      const response = await fetch('http://localhost:3333/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Icon name="logo" size="lg" className={styles.logo} />

        <Text type="heading" as="h1" size="4xl">
          Get started with SaneFeed
        </Text>

        <Text>
          Join us to take control of your content. Your Content, Your Way!
        </Text>

        <Text>
          Already have an account? <Link href="/login">Log in</Link>
        </Text>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
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
            helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
            error={errors.password?.message}
            watchedPassword={watchedPassword}
            withStrengthMeter
          />
        </div>

        <div className={styles.group}>
          {false && (
            <FormError>
              An error occurred on the server. Please try again later.
            </FormError>
          )}

          <Button type="submit" className={styles.button}>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
