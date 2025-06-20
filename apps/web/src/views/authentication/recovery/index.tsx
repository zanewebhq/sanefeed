'use client';

import styles from './styles.module.css';
import { useState } from 'react';
import SendRecoveryCodeStep from './send-recovery-code';
import VerifyRecoveryCodeStep from './verify-recovery-code';
import UpdatePasswordStep from './update-password';

export default function PasswordRecoveryView() {
  const [email, setEmail] = useState<string>();
  const [code, setCode] = useState<string>();
  const [step, setStep] = useState(1);

  return (
    <div className={styles.wrapper}>
      {step === 1 && (
        <SendRecoveryCodeStep next={() => setStep(2)} setEmail={setEmail} />
      )}

      {step === 2 && (
        <VerifyRecoveryCodeStep
          next={() => setStep(3)}
          email={email}
          setCode={setCode}
        />
      )}

      {step === 3 && <UpdatePasswordStep email={email} code={code} />}
    </div>
  );
}
