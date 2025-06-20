import LoginView from 'apps/web/src/views/authentication/login';

import styles from '../page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <LoginView />
    </div>
  );
}
