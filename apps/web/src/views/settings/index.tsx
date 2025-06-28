import { Text } from '@sanefeed/ui';
import AccountDetails from './account-details';
import styles from './styles.module.css';
import getUser from '../../utils/get-user';
import DeleteAccount from './delete-account';

export default async function SettingsView() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Text as="h1" size="4xl">
        Settings
      </Text>

      <AccountDetails user={user} />

      <DeleteAccount />
    </div>
  );
}
