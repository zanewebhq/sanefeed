import Icon, { IconProps } from '../icon/icon';
import styles from './link.module.css';

export interface LinkProps {
  children: string;
  href: string;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export function Link({ children, href, iconLeft, iconRight }: LinkProps) {
  return (
    <a href={href} className={styles.link}>
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" />}
    </a>
  );
}

export default Link;
