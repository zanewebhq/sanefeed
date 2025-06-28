import { Dialog } from '@sanefeed/ui';
import { useState } from 'react';
import RequestPasswordChange from './request-password-change';
import ConfirmPasswordChange from './confirm-password-change';

export interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordDialog({
  isOpen,
  onClose,
}: ChangePasswordDialogProps) {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    onClose();
    setStep(1);
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      {step === 1 && (
        <RequestPasswordChange onClose={handleClose} next={() => setStep(2)} />
      )}

      {step === 2 && <ConfirmPasswordChange onClose={handleClose} />}
    </Dialog>
  );
}
