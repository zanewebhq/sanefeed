import { Dialog, FormError, Link, Text, TextField } from '@sanefeed/ui';
import styles from './styles.module.css';
import { useState } from 'react';
import useConfirmAccountDeletionForm, { Inputs } from './use-form';
import { SubmitHandler } from 'react-hook-form';
import request from 'apps/web/src/utils/request';
import { toast } from '@sanefeed/ui';
import { useRouter } from 'next/navigation';

interface ConfirmAccountDeletionProps {
  onClose: () => void;
}

export default function ConfirmAccountDeletion({
  onClose,
}: ConfirmAccountDeletionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const methods = useConfirmAccountDeletionForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await request({
      endpoint: '/user/delete-account/confirm',
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
      toast.success('Your account has been deleted!');
      router.push('/');
    }
  };

  return (
    <>
      <Dialog.Header title="Confirm account deletion">
        <Text as="p">A confirmation code has been sent to your email.</Text>
        <Text as="p">Enter it below to delete your account.</Text>
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
            submitText="Confirm deletion"
            submitTheme="red"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}
