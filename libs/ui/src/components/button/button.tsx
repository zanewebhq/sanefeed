import Icon, { IconProps } from '../icon/icon';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  iconLeft,
  iconRight,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} disabled={disabled}>
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

export default Button;
