import { Request } from 'express';

export interface User {
  id: number;
  email: string;
  password: string;
  verified: boolean;
  verification_code: string;
  verification_code_expires_at: string;
  recovery_code: string;
  recovery_code_expires_at: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
