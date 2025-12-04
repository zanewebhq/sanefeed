import { User } from '../models/user';

const sanitizeUser = (user: User) => ({
  id: user.id,
  email: user.email,
  verified: user.verified,
});

export default sanitizeUser;
