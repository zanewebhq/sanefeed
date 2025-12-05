import Text from '../../text';
import styles from './header.module.css';

export interface DialogHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function DialogHeader({
  title,
  description,
  children,
}: DialogHeaderProps) {
  return (
    <div className={styles.header}>
      <Text as="h3" className={styles.title}>
        {title}
      </Text>

      <Text as="p">{description}</Text>

      {children}
    </div>
  );
}

export default DialogHeader;
