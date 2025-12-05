import getUser from 'apps/web/src/utils/get-user';
import LoginView from 'apps/web/src/views/authentication/login';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return <LoginView />;
}
