import EmailVerificationView from 'apps/web/src/views/authentication/verification';

import styles from '../page.module.css';

export default function VerifyPage() {
  return (
    <div className={styles.wrapper}>
      <EmailVerificationView />
    </div>
  );
}
