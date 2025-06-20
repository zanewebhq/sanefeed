import { executeQuery } from '../database/utils';

export interface User {
  id: number;
  email: string;
  password: string;
  verified: boolean;
  verification_code: string;
  verification_code_expires_at: Date;
  recovery_code: string;
  recovery_code_expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export const getUserById = async (id: number) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  return await executeQuery<User>(query, [id]);
};

export const getUserByEmail = async (email: string) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  return await executeQuery<User>(query, [email]);
};
