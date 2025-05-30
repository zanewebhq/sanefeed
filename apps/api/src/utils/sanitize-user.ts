interface User {
  id: number;
  email: string;
  password: string;
  verified: boolean;
  verification_code: string;
  verification_code_expires_at: string;
}

const sanitizeUser = (user: User) => ({ id: user.id, email: user.email });

export default sanitizeUser;
