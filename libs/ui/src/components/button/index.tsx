import { cx } from '../../utils';
import Icon, { IconProps } from '../icon';
import Spinner from '../spinner';
import Text from '../text';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonTheme = 'blue' | 'red';

export interface ButtonProps {
  children: string;
  className?: string;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  disabled?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  onClick?: () => void;
  href?: string;
  openNewTab?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  theme = 'blue',
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  href,
  openNewTab = false,
  loading = false,
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[theme], className);

  return href ? (
    <a
      href={href}
      className={classes}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
    >
      {iconLeft && <Icon name={iconLeft} />}
      <Text size="lg" className={styles.buttonText}>
        {children}
      </Text>
      {iconRight && <Icon name={iconRight} />}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
    >
      {loading && <Spinner />}
      {iconLeft && !loading && <Icon name={iconLeft} />}
      <Text size="lg" className={styles.buttonText}>
        {children}
      </Text>
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

export default Button;
