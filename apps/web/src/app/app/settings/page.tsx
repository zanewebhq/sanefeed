import { requireUser } from 'apps/web/src/utils/require-user';
import SettingsView from '../../../views/settings';

export default async function SettingsPage() {
  const user = await requireUser({ requireVerified: true });

  return <SettingsView />;
}