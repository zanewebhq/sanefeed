import { Dialog, FormError, PasswordField, Text } from '@sanefeed/ui';
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
      <Dialog.Header title="Delete your account">
        <Text as="p">
          Deleting your account will permanently remove all your data.
        </Text>
        <Text as="p">This action cannot be undone.</Text>
      </Dialog.Header>

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
