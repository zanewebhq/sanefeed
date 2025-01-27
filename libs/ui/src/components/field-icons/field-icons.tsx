import { cx } from '../../utils';
import Icon, { IconProps } from '../icon/icon';
import styles from './field-icons.module.css';

export interface FieldIconsProps {
  error: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
}

export const FieldIcons = ({ iconLeft, iconRight, error }: FieldIconsProps) => {
  return (
    <>
      {iconLeft && (
        <div className={cx(styles.icons, styles.iconsLeft)}>
          <Icon name={iconLeft} size="md" />
        </div>
      )}

      {(iconRight || error) && (
        <div className={cx(styles.icons, styles.iconsRight)}>
          {iconRight && <Icon name={iconRight} size="md" />}

          {error && (
            <Icon name="error" size="md" className={styles.iconError} />
          )}
        </div>
      )}
    </>
  );
};

export default FieldIcons;
