import { Dialog } from '@sanefeed/ui';
import { useState } from 'react';
import RequestEmailChange from './request-email-change';
import ConfirmEmailChange from './confirm-email-change';

export interface ChangeEmailDialogrops {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangeEmailDialog({
  isOpen,
  onClose,
}: ChangeEmailDialogrops) {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    onClose();
    setStep(1);
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      {step === 1 && (
        <RequestEmailChange onClose={handleClose} next={() => setStep(2)} />
      )}

      {step === 2 && <ConfirmEmailChange onClose={handleClose} />}
    </Dialog>
  );
}
