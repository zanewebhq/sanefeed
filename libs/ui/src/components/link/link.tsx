import Icon, { IconProps } from '../icon/icon';
import styles from './link.module.css';

export interface LinkProps {
  children: string;
  href?: string;
  openNewTab?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  onClick?: () => void;
}

export function Link({
  children,
  href,
  openNewTab = false,
  iconLeft,
  iconRight,
  onClick,
}: LinkProps) {
  return href ? (
    <a
      href={href}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
      className={styles.link}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" />}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={styles.link}>
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" />}
    </button>
  );
}

export default Link;
