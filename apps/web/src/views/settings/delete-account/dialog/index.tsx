import { Dialog } from '@sanefeed/ui';
import { useState } from 'react';
import RequestAccountDeletion from './request-account-deletion';
import ConfirmAccountDeletion from './confirm-account-deletion';

export interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountDialog({
  isOpen,
  onClose,
}: DeleteAccountDialogProps) {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    onClose();
    setStep(1);
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      {step === 1 && (
        <RequestAccountDeletion onClose={handleClose} next={() => setStep(2)} />
      )}

      {step === 2 && <ConfirmAccountDeletion onClose={handleClose} />}
    </Dialog>
  );
}
