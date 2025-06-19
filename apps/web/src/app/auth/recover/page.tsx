import Recovery from 'apps/web/src/components/recovery';
import styles from '../page.module.css';

export default function PasswordRecoveryPage() {
  return (
    <div className={styles.wrapper}>
      <Recovery>
        <Recovery.Header />
        <Recovery.Form />
      </Recovery>
    </div>
  );
}
