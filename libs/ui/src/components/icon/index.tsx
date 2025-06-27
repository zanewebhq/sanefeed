import { IconName, icons, IconSize, sizes } from './utils';
import styles from './icon.module.css';
import { cx } from '../../utils';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
}

export function Icon({ name, size = 'md', className, onClick }: IconProps) {
  const IconComponent = icons[name];

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(styles.button, styles[size], className)}
      >
        <IconComponent size={sizes[size]} />
      </button>
    );
  }

  return <IconComponent size={sizes[size]} className={className} />;
}

export default Icon;
