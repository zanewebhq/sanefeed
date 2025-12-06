import { requireUser } from '../../utils/require-user';
import AppHomeView from '../../views/app-home';

export default async function AppHomePage() {
  const user = await requireUser({ requireVerified: true });

  return <AppHomeView user={user} />;
}
