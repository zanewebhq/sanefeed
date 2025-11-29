import { cx } from '../../utils';
import styles from './spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div className={cx(styles.spinnerWrapper, styles[size], className)}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
