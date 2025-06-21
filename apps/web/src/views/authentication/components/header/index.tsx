import { Icon, Text } from '@sanefeed/ui';
import styles from './styles.module.css';

interface AuthenticationHeaderProps {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

export default function AuthenticationHeader({
  children,
  heading,
  description,
}: AuthenticationHeaderProps) {
  return (
    <div className={styles.header}>
      <Icon name="logo" className={styles.logo} />

      <Text as="h1" size="4xl">
        {heading}
      </Text>

      {description && <Text as="p">{description}</Text>}

      {children}
    </div>
  );
}
