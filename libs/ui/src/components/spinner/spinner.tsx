import styles from './spinner.module.css';

export function Spinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
