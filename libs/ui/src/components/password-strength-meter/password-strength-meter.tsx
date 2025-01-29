import { cx } from '../../utils';
import styles from './password-strength-meter.module.css';

const conditions = [
  {
    id: 'length',
    pattern: /.{8,}/,
    message: 'Add a minimum of 8 characters.',
  },
  {
    id: 'upperAndLowerCase',
    pattern: /(?=.*[a-z])(?=.*[A-Z])/,
    message: 'Use upper and lower case.',
  },
  {
    id: 'digit',
    pattern: /\d/,
    message: 'Add at least 1 digit.',
  },
  {
    id: 'special',
    pattern: /[^A-Za-z0-9]/,
    message: 'Add at least 1 special character.',
  },
];

const strengthLevels = [
  { className: 'weak', label: 'Weak.' },
  { className: 'moderate', label: 'Moderate.' },
  { className: 'good', label: 'Good.' },
  { className: 'strong', label: 'Strong.' },
  { className: 'excellent', label: 'Excellent.' },
];

const checkPasswordStrength = (password: string) => {
  let conditionsMet = 0;
  let firstUnmetCondition = null;

  for (const condition of conditions) {
    if (condition.pattern.test(password)) {
      conditionsMet++;
    } else if (!firstUnmetCondition) {
      firstUnmetCondition = condition.message;
    }
  }

  return {
    score: conditionsMet,
    message: firstUnmetCondition,
    ...strengthLevels[conditionsMet],
  };
};

export interface PasswordStrengthMeterProps {
  value: string;
}

export const PasswordStrengthMeter = ({
  value,
}: PasswordStrengthMeterProps) => {
  const isEmpty = !value.length;
  const strength = checkPasswordStrength(value);

  return (
    <div
      className={cx(
        styles.strengthMeter,
        !isEmpty && styles[strength.className]
      )}
    >
      <div className={styles.segment} />
      <div className={styles.segment} />
      <div className={styles.segment} />
      <div className={styles.segment} />
      <div className={styles.segment} />
    </div>
  );
};

export default PasswordStrengthMeter;
