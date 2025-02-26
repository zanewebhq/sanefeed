import VerificationForm from './form';
import VerificationHeader from './header';

import styles from './styles.module.css';

interface VerificationProps {
  children: React.ReactNode;
}

export default function Verification({ children }: VerificationProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

Verification.Header = VerificationHeader;
Verification.Form = VerificationForm;
