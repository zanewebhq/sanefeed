import Icon, { IconProps } from '../icon/icon';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  children: string;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  onClick?: () => void;
  href?: string;
  openNewTab?: boolean;
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  href,
  openNewTab = false,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return href ? (
    <a
      href={href}
      className={className}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
    >
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

export default Button;
