import { IconProps } from '../icon/icon';
import styles from './text-field.module.css';

export interface GetInputClassesParams {
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  error?: string;
}

export const getInputClasses = ({
  iconLeft,
  iconRight,
  error,
}: GetInputClassesParams) => {
  const classes = [];

  if (iconLeft) {
    classes.push(styles.inputWithIconLeft);
  }

  if (iconRight && error) {
    classes.push(styles.inputWithDoubleIconRight);
  } else if (iconRight || error) {
    classes.push(styles.inputWithIconRight);
  }

  if (error) {
    classes.push(styles.inputError);
  }

  return classes;
};
