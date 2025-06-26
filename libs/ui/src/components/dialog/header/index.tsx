import Text from '../../text';
import styles from './header.module.css';

export interface DialogHeaderProps {
  title: string;
  description: string;
}

export function DialogHeader({ title, description }: DialogHeaderProps) {
  return (
    <div className={styles.header}>
      <Text as="h3" className={styles.title}>
        {title}
      </Text>

      <Text as="p">{description}</Text>
    </div>
  );
}

export default DialogHeader;
