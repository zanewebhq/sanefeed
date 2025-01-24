import Icon, { IconProps } from '../icon/icon';
import styles from './link.module.css';

export interface LinkProps {
  children: string;
  href: string;
  openNewTab?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export function Link({
  children,
  href,
  openNewTab = false,
  iconLeft,
  iconRight,
}: LinkProps) {
  return (
    <a
      href={href}
      className={styles.link}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" />}
    </a>
  );
}

export default Link;
