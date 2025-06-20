import SignupView from 'apps/web/src/views/authentication/signup';

import styles from '../page.module.css';

export default function SignupPage() {
  return (
    <div className={styles.wrapper}>
      <SignupView />
    </div>
  );
}
