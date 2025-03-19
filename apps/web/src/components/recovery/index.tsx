import RecoveryForm from './form';
import RecoveryHeader from './header';

import styles from './styles.module.css';

interface RecoveryProps {
  children: React.ReactNode;
}

export default function Recovery({ children }: RecoveryProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

Recovery.Header = RecoveryHeader;
Recovery.Form = RecoveryForm;
