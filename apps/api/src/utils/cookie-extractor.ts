import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  console.log('Cookies:', req.cookies);
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['token'];
  }

  return token;
};

export default cookieExtractor;
