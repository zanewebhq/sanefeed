export function cx(...classNames: (string | undefined | false)[]): string {
  return classNames.filter(Boolean).join(' ');
}

export interface GetInputClassesParams {
  iconLeft?: boolean;
  iconRight?: boolean;
  error?: boolean;
  styles: {
    leftIconPadding: string;
    doubleIconPadding: string;
    rightIconPadding: string;
    inputError: string;
  };
}

export const getInputClasses = ({
  iconLeft = false,
  iconRight = false,
  error = false,
  styles,
}: GetInputClassesParams) => {
  const classes: string[] = [];

  const conditions = [
    { condition: iconLeft, className: styles.leftIconPadding },
    { condition: iconRight && error, className: styles.doubleIconPadding },
    { condition: iconRight || error, className: styles.rightIconPadding },
    { condition: error, className: styles.inputError },
  ];

  conditions.forEach(({ condition, className }) => {
    if (condition) {
      classes.push(className);
    }
  });

  return classes;
};
