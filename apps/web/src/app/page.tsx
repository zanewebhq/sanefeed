import getUser from '../utils/get-user';
import request from '../utils/request';
import HomeView from '../views/home';

export default async function HomePage() {
  const user = await getUser();

  return <HomeView user={user} />;
}
