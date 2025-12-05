import { Dialog, FormError, Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import useConfirmPasswordChangeForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';
import { toast } from '@sanefeed/ui';
import { useRouter } from 'next/navigation';

interface ConfirmPasswordChangeProps {
  onClose: () => void;
}

export default function ConfirmPasswordChange({
  onClose,
}: ConfirmPasswordChangeProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useConfirmPasswordChangeForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/user/change-password/confirm',
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
      onClose();
      toast.success('Your password has been updated!');
      router.refresh();
    }
  };

  return (
    <>
      <Dialog.Header title="Confirm password change">
        <Text as="p">A verification code has been sent to your email.</Text>
        <Text as="p">Enter it below to complete the password change.</Text>
      </Dialog.Header>

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
              Check your spam folder or{' '}
              <Link>resend the verification code</Link>.
            </Text>
          </div>

          <FormError error={formError} />

          <Dialog.Buttons
            onClose={onClose}
            submitText="Confirm password"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}
