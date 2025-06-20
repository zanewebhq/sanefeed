import { User } from '../models/user';

const sanitizeUser = (user: User) => ({ id: user.id, email: user.email });

export default sanitizeUser;
