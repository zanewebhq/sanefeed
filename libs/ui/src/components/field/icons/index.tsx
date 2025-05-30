import { cx } from '../../../utils';
import Icon, { IconProps } from '../../icon';
import styles from './icons.module.css';
import { getIconClasses } from './utils';

export interface FieldIconsProps {
  error: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  onRightIconClick?: () => void;
}

export const FieldIcons = ({
  iconLeft,
  iconRight,
  error,
  onRightIconClick,
}: FieldIconsProps) => {
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
        <div className={styles.left}>
          <Icon name={iconLeft} size="md" />
        </div>
      )}

      {(iconRight || error) && (
        <div className={styles.right}>
          {iconRight && (
            <Icon
              name={iconRight}
              size="md"
              className={onRightIconClick ? styles.clickable : undefined}
              onClick={onRightIconClick}
            />
          )}

          {error && (
            <Icon name="error" size="md" className={styles.iconError} />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldIcons;
