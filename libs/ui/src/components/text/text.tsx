import styles from './text.module.css';

export type TextTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TextType = 'body' | 'heading' | 'ui';

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
  as?: TextTag;
  type?: TextType;
  size?: TextSize;
}

export const Text = ({
  children,
  as: Tag = 'p',
  type = 'body',
  size = 'md',
}: TextProps) => {
  const className = `${styles.text} ${styles[`type-${type}`]} ${
    styles[`size-${size}`]
  }`;

  return <Tag className={className}>{children}</Tag>;
};

export default Text;
