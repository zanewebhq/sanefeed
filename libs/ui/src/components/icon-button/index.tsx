import { cx } from '../../utils';
import Icon, { IconProps } from '../icon';
import styles from './icon-button.module.css';

export type IconButtonVariant = 'primary' | 'secondary';
export type IconButtonTheme = 'blue' | 'red';

export interface IconButtonProps {
  className?: string;
  type?: 'button' | 'submit';
  variant?: IconButtonVariant;
  theme?: IconButtonTheme;
  disabled?: boolean;
  icon?: IconProps['name'];
  onClick?: () => void;
  href?: string;
  openNewTab?: boolean;
  loading?: boolean;
}

export function IconButton({
  className,
  type = 'button',
  variant = 'primary',
  theme = 'blue',
  disabled = false,
  icon,
  onClick,
  href,
  openNewTab = false,
  loading = false,
}: IconButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[theme], className);

  return href ? (
    <a
      href={href}
      className={classes}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
    >
      {icon && <Icon name={icon} size="lg" />}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
    >
      {icon && <Icon name={icon} size="lg" />}
    </button>
  );
}

export default IconButton;
