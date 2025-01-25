import { cx } from '../../utils';
import Icon, { IconProps } from '../icon/icon';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  children: string;
  className?: string;
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
  className,
  type = 'button',
  variant = 'primary',
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  href,
  openNewTab = false,
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], className);

  return href ? (
    <a
      href={href}
      className={classes}
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
      className={classes}
      disabled={disabled}
    >
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

export default Button;
