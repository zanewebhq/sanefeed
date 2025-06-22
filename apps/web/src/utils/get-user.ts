import { cookies } from 'next/headers';
import request from './request';

const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  const response = await request({
    endpoint: '/me',
    method: 'GET',
    headers: {
      Cookie: `token=${token.value}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  return result.data.user;
};

export default getUser;
