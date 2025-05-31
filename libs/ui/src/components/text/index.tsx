import { cx } from '../../utils';
import styles from './text.module.css';

export type TextTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export type TextType = 'body' | 'heading' | 'label';

export type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export interface TextProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: TextTag;
  type?: TextType;
  size?: TextSize;
}

export const Text = ({
  children,
  id,
  className,
  as: Tag = 'span',
  type,
  size,
}: TextProps) => {
  const classes = cx(
    styles.text,
    type ? styles[`type-${type}`] : '',
    size ? styles[`size-${size}`] : '',
    className
  );

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
};

export default Text;
