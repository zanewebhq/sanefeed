import { Text } from '@sanefeed/ui';
import styles from './styles.module.css';

interface HomeViewProps {
  user: any;
}

export default function HomeView({ user }: HomeViewProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Text as="h1">Welcome to SaneFeed!</Text>

        <Text as="p">
          You are logged in as: <b>{user.email}</b>!
        </Text>
      </div>
    </div>
  );
}
