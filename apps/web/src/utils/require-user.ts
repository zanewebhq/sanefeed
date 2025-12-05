import getUser from './get-user';
import { redirect } from 'next/navigation';

interface RequireUserOptions {
  requireVerified?: boolean;
}

export const requireUser = async (options: RequireUserOptions = {}) => {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (options.requireVerified && !user.verified) {
    redirect('/auth/verify');
  }

  return user;
};
