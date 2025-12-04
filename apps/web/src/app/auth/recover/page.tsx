import getUser from 'apps/web/src/utils/get-user';
import PasswordRecoveryView from 'apps/web/src/views/authentication/recovery';
import { redirect } from 'next/navigation';

export default async function PasswordRecoveryPage() {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return <PasswordRecoveryView />;
}
