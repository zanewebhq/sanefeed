import styles from './layout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar} />

      {children}
    </div>
  );
}
