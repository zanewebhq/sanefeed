import { cx } from '../../utils';
import Icon, { IconProps } from '../icon/icon';
import styles from './field-icons.module.css';
import { getIconClasses } from './utils';

export interface FieldIconsProps {
  error: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export const FieldIcons = ({ iconLeft, iconRight, error }: FieldIconsProps) => {
  const iconClasses = getIconClasses({
    iconLeft: !!iconLeft,
    iconRight: !!iconRight,
    error,
    styles: {
      singleIconLeft: styles.singleIconLeft,
      singleIconRight: styles.singleIconRight,
      doubleIconRight: styles.doubleIconRight,
    },
  });

  return (
    <div className={cx(styles.icons, ...iconClasses)}>
      {iconLeft && (
        <div className={styles.group}>
          <Icon name={iconLeft} size="md" />
        </div>
      )}

      {(iconRight || error) && (
        <div className={styles.group}>
          {iconRight && <Icon name={iconRight} size="md" />}

          {error && (
            <Icon name="error" size="md" className={styles.iconError} />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldIcons;
