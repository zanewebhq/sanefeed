'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          watchedPassword={watchedPassword}
          label="Password"
          helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
          error={errors.password?.message}
          withStrengthMeter
        />

        <Button type="submit" className={styles.button}>
          Sign up
        </Button>
      </form>
    </div>
  );
}
