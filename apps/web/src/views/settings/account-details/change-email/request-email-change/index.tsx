import { Dialog, FormError, PasswordField, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import useRequestEmailChangeForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';

interface RequestEmailChangeProps {
  onClose: () => void;
  next: () => void;
}

export default function RequestEmailChange({
  onClose,
  next,
}: RequestEmailChangeProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useRequestEmailChangeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/user/change-email',
      method: 'POST',
      body: {
        password: data.password,
        newEmail: data.newEmail,
      },
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFormError(result.message);
    } else {
      next();
    }
  };

  return (
    <>
      <Dialog.Header
        title="Change email address"
        description="To change your email address, enter your current password and the new email address below."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <PasswordField
          {...register('password')}
          label="Password"
          error={errors.password?.message}
        />

        <TextField
          {...register('newEmail')}
          type="email"
          label="New email address"
          placeholder="name@example.com"
          iconLeft="mail"
          error={errors.newEmail?.message}
        />

        <div className={styles.submit}>
          <FormError error={formError} />

          <Dialog.Buttons
            onClose={onClose}
            submitText="Update email"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}
