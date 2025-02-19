import styles from './styles.module.css';
import AuthenticationHeader from '../authentication/header';
import AuthenticationForm from './form';

interface AuthenticationProps {
  children: React.ReactNode;
}

export default function Authentication({ children }: AuthenticationProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

Authentication.Header = AuthenticationHeader;
Authentication.Form = AuthenticationForm;
