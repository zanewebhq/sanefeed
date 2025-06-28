import { Dialog, FormError, PasswordField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import useRequestAccountDeletionForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';

interface RequestAccountDeletionProps {
  onClose: () => void;
  next: () => void;
}

export default function RequestAccountDeletion({
  onClose,
  next,
}: RequestAccountDeletionProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useRequestAccountDeletionForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/user/delete-account',
      method: 'POST',
      body: {
        password: data.password,
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
        title="Delete your account"
        description="To delete your account, please enter your password. Deleting your account will permanently remove all your data. This action cannot be undone."
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

        <div className={styles.submit}>
          <FormError error={formError} />

          <Dialog.Buttons
            onClose={onClose}
            submitText="Delete account"
            submitTheme="red"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}
