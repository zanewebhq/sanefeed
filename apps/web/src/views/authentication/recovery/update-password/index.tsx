import {
  Button,
  FormError,
  Icon,
  Link,
  PasswordField,
  Text,
  TextField,
} from '@sanefeed/ui';

import styles from '../styles.module.css';
import { Inputs } from '../use-form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface UpdatePasswordStepProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  formError: string | undefined;
  loading: boolean;
  watchedPassword: string;
}

export default function UpdatePasswordStep({
  register,
  errors,
  formError,
  loading,
  watchedPassword,
}: UpdatePasswordStepProps) {
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

      <div className={styles.fields}>
        <PasswordField
          {...register('password')}
          label="Password"
          helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
          error={errors.password?.message}
          watchedPassword={watchedPassword}
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
      </div>
    </>
  );
}
