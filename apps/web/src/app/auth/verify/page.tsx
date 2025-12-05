import getUser from 'apps/web/src/utils/get-user';
import EmailVerificationView from 'apps/web/src/views/authentication/verification';
import { redirect } from 'next/navigation';

export default async function VerifyPage() {
  const user = await getUser();

  if (!!user?.verified) {
    redirect('/auth/login');
  }

  return <EmailVerificationView />;
}
