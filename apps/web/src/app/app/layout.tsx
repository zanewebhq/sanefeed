import { Sidebar } from '@sanefeed/ui';
import styles from './layout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      {children}
    </div>
  );
}
