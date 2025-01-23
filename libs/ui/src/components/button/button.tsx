import styles from './button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return <button className={styles.button}>{children}</button>;
}
