import Authentication from '../../../components/authentication';

import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <Authentication>
        <Authentication.Header type="login" />
        <Authentication.Form type="login" />
      </Authentication>
    </div>
  );
}
