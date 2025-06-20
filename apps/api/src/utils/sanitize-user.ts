import { User } from '../types';

const sanitizeUser = (user: User) => ({ id: user.id, email: user.email });

export default sanitizeUser;
