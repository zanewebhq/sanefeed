import Verification from '../../../components/verification';
import styles from '../page.module.css';

export default function VerifyPage() {
  return (
    <div className={styles.wrapper}>
      <Verification>
        <Verification.Header />
        <Verification.Form />
      </Verification>
    </div>
  );
}
