import getUser from 'apps/web/src/utils/get-user';
import SignupView from 'apps/web/src/views/authentication/signup';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return <SignupView />;
}
