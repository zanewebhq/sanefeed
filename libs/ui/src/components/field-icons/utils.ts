export interface GetIconClassesProps {
  iconLeft: boolean;
  iconRight: boolean;
  error: boolean;
  styles: {
    singleIconLeft: string;
    singleIconRight: string;
    doubleIconRight: string;
  };
}

export const getIconClasses = ({
  iconLeft,
  iconRight,
  error,
  styles,
}: GetIconClassesProps) => {
  const classes: string[] = [];

  const conditions = [
    { condition: iconLeft, className: styles.singleIconLeft },
    { condition: iconRight && error, className: styles.doubleIconRight },
    { condition: iconRight || error, className: styles.singleIconRight },
  ];

  conditions.forEach(({ condition, className }) => {
    if (condition) {
      classes.push(className);
    }
  });

  return classes;
};
