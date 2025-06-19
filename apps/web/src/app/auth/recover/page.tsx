import styles from '../page.module.css';
import PasswordRecoveryView from 'apps/web/src/views/authentication/recovery';

export default function PasswordRecoveryPage() {
  return (
    <div className={styles.wrapper}>
      <PasswordRecoveryView />
    </div>
  );
}
