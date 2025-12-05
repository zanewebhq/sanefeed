import HomeView from '../views/home';
import { requireUser } from '../utils/require-user';

export default async function HomePage() {
  const user = await requireUser({ requireVerified: true });

  return <HomeView user={user} />;
}
