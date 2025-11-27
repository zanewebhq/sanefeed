import { Dialog, FormError, PasswordField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import useRequestPasswordChangeForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';

interface RequestPasswordChangeProps {
  onClose: () => void;
  next: () => void;
}

export default function RequestPasswordChange({
  onClose,
  next,
}: RequestPasswordChangeProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useRequestPasswordChangeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/user/change-password',
      method: 'POST',
      body: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
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
        title="Change your password"
        description="To change your password, enter your current password and then choose a new one."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <PasswordField
          {...register('currentPassword')}
          label="Current password"
          error={errors.currentPassword?.message}
        />

        <PasswordField
          {...register('newPassword')}
          label="New password"
          error={errors.newPassword?.message}
          helper="Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit"
          watchedPassword={newPassword}
          withStrengthMeter
        />

        <div className={styles.submit}>
          <FormError error={formError} />

          <Dialog.Buttons
            onClose={onClose}
            submitText="Update password"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}
