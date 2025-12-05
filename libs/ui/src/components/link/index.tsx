import { cx } from '../../utils';
import Icon, { IconProps } from '../icon';
import Spinner from '../spinner';
import styles from './link.module.css';

export interface LinkProps {
  children: string;
  className?: string;
  href?: string;
  openNewTab?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  onClick?: () => void;
  loading?: boolean;
}

export function Link({
  children,
  className,
  href,
  openNewTab = false,
  iconLeft,
  iconRight,
  onClick,
  loading = false,
}: LinkProps) {
  const classes = cx(styles.link, className);

  return href ? (
    <a
      href={href}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
      className={classes}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" />}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      disabled={loading}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" />}
      {loading && <Spinner size="xs" />}
    </button>
  );
}

export default Link;
