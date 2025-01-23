import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
