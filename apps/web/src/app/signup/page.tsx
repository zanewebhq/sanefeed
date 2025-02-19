import Authentication from '../../components/authentication';

import styles from './page.module.css';

export default function SignupPage() {
  return (
    <div className={styles.wrapper}>
      <Authentication>
        <Authentication.Header type="signup" />
        <Authentication.Form type="signup" />
      </Authentication>
    </div>
  );
}
