import { Dialog, FormError, Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import useConfirmEmailChangeForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';

interface ConfirmEmailChangeProps {
  onClose: () => void;
}

export default function ConfirmEmailChange({
  onClose,
}: ConfirmEmailChangeProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useConfirmEmailChangeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/user/change-email/confirm',
      method: 'POST',
      body: {
        code: data.code,
      },
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFormError(result.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <Dialog.Header
        title="Verify your new email address"
        description="To complete your email change, please verify your new address by entering the verification code we just sent to email@example.com"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <TextField
          {...register('code')}
          type="text"
          label="Verification code"
          error={errors.code?.message}
        />

        <Text as="p">The code will expire in 1 hour.</Text>

        <div className={styles.group}>
          <div>
            <Text as="p">Didn't receive the code?</Text>
            <Text as="p">
              Check your spam folder or <Link>resend the recovery code</Link>.
            </Text>
          </div>

          <FormError error={formError} />

          <Dialog.Buttons
            onClose={onClose}
            submitText="Verify email"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}
