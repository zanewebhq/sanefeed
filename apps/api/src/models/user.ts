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

export const createUser = async (
  data: Pick<
    User,
    'email' | 'password' | 'verification_code' | 'verification_code_expires_at'
  >
) => {
  const { email, password, verification_code, verification_code_expires_at } =
    data;

  const query = `
    INSERT INTO users (email, password, verification_code, verification_code_expires_at)
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;

  return await executeQuery<User>(query, [
    email,
    password,
    verification_code,
    verification_code_expires_at,
  ]);
};
