import Icon from '../icon';
import Link from '../link';
import Text from '../text';
import styles from './sidebar.module.css';

export interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <Icon name="logo" size="xl" />

        <Text as="p" size="2xl" className={styles.headerText}>
          SaneFeed
        </Text>
      </div>

      <div className={styles.content}>
        <div className={styles.empty}>
          <Icon name="mailbox" size="xl" />
          <Text as="h3">Your feed list is empty.</Text>
          <Text as="p">
            <Link>Add some feeds</Link> to your list to start receiving the
            latest articles!
          </Text>
        </div>
      </div>

      <div className={styles.footer}></div>
    </div>
  );
}

export default Sidebar;
