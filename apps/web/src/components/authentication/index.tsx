import AuthenticationHeader from './header';
import AuthenticationForm from './form';

import styles from './styles.module.css';

interface AuthenticationProps {
  children: React.ReactNode;
}

export default function Authentication({ children }: AuthenticationProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

Authentication.Header = AuthenticationHeader;
Authentication.Form = AuthenticationForm;
