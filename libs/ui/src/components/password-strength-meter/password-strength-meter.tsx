'use client';

import { cx } from '../../utils';
import styles from './password-strength-meter.module.css';
import Field from '../field/field';
import { useEffect, useState } from 'react';

const conditions = [
  {
    pattern: /.{8,}/,
    hint: 'Add a minimum of 8 characters.',
  },
  {
    pattern: /(?=.*[a-z])(?=.*[A-Z])/,
    hint: 'Use upper and lower case.',
  },
  {
    pattern: /\d/,
    hint: 'Add at least 1 digit.',
  },
  {
    pattern: /[^A-Za-z0-9]/,
    hint: 'Add at least 1 special character.',
  },
];

const strengthLevels = [
  { className: 'weak', label: 'Weak.' },
  { className: 'moderate', label: 'Moderate.' },
  { className: 'good', label: 'Good.' },
  { className: 'strong', label: 'Strong.' },
  { className: 'excellent', label: 'Excellent! Your password is secure.' },
];

const checkPasswordStrength = (password: string) => {
  let conditionsMet = 0;
  let unmetConditionHint = '';

  for (const condition of conditions) {
    if (condition.pattern.test(password)) {
      conditionsMet++;
    } else if (!unmetConditionHint) {
      unmetConditionHint = condition.hint;
    }
  }

  return {
    score: conditionsMet,
    hint: unmetConditionHint,
    ...strengthLevels[conditionsMet],
  };
};

export interface PasswordStrength {
  className: string;
  label: string;
  score: number;
  hint: string;
}

export interface PasswordStrengthMeterProps {
  name: string;
  value?: string;
  showHint?: boolean;
}

const initialStrength: PasswordStrength = {
  className: 'weak',
  label: 'Weak.',
  score: 0,
  hint: '',
};

export const PasswordStrengthMeter = ({
  name,
  value,
  showHint = false,
}: PasswordStrengthMeterProps) => {
  const [strength, setStrength] = useState<PasswordStrength>(initialStrength);
  const message = `${strength.label} ${strength.hint}`;

  useEffect(() => {
    if (value) {
      setStrength(checkPasswordStrength(value));
    } else {
      setStrength(initialStrength);
    }
  }, [value]);

  return (
    <>
      <div className={cx(styles.strengthMeter, styles[strength.className])}>
        <div className={styles.segment} />
        <div className={styles.segment} />
        <div className={styles.segment} />
        <div className={styles.segment} />
        <div className={styles.segment} />
      </div>

      {showHint && (
        <Field.Helper
          id={`${name}-hint`}
          className={styles[strength.className]}
          message={message}
        />
      )}
    </>
  );
};

export default PasswordStrengthMeter;
