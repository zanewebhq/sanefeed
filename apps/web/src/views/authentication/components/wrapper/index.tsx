import styles from './styles.module.css';

interface AuthenticationWrapperProps {
  children: React.ReactNode;
}

export default function AuthenticationWrapper({
  children,
}: AuthenticationWrapperProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
