import { IconName, icons, IconSize, sizes } from './utils';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
}

export function Icon({ name, size = 'md', className, onClick }: IconProps) {
  const IconComponent = icons[name];

  return (
    <IconComponent size={sizes[size]} className={className} onClick={onClick} />
  );
}

export default Icon;
