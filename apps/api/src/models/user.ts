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

type GetUserById = (id: number) => Promise<User | null>;

export const getUserById: GetUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  return await executeQuery(query, [id]);
};

type GetUserByEmail = (email: string) => Promise<User | null>;

export const getUserByEmail: GetUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  return await executeQuery<User>(query, [email]);
};

type CreateUser = (
  data: Pick<
    User,
    'email' | 'password' | 'verification_code' | 'verification_code_expires_at'
  >
) => Promise<User | null>;

export const createUser: CreateUser = async (data) => {
  const { email, password, verification_code, verification_code_expires_at } =
    data;

  const query = `
    INSERT INTO users (email, password, verification_code, verification_code_expires_at)
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;

  return await executeQuery(query, [
    email,
    password,
    verification_code,
    verification_code_expires_at,
  ]);
};

type UpdateUser = (id: number, data: Partial<User>) => Promise<User | null>;

export const updateUser: UpdateUser = async (id, data) => {
  const {
    email,
    password,
    verified,
    verification_code,
    verification_code_expires_at,
    recovery_code,
    recovery_code_expires_at,
    updated_at,
  } = data;
  const setClauses: string[] = [];
  const params: unknown[] = [id];

  if (email !== undefined) {
    setClauses.push('email = $' + (params.length + 1));
    params.push(email === null ? null : email);
  }

  if (password !== undefined) {
    setClauses.push('password = $' + (params.length + 1));
    params.push(password === null ? null : password);
  }

  if (verified !== undefined) {
    setClauses.push('verified = $' + (params.length + 1));
    params.push(verified === null ? null : verified);
  }

  if (verification_code !== undefined) {
    setClauses.push('verification_code = $' + (params.length + 1));
    params.push(verification_code === null ? null : verification_code);
  }

  if (verification_code_expires_at !== undefined) {
    setClauses.push('verification_code_expires_at = $' + (params.length + 1));
    params.push(
      verification_code_expires_at === null
        ? null
        : verification_code_expires_at
    );
  }

  if (recovery_code !== undefined) {
    setClauses.push('recovery_code = $' + (params.length + 1));
    params.push(recovery_code === null ? null : recovery_code);
  }

  if (recovery_code_expires_at !== undefined) {
    setClauses.push('recovery_code_expires_at = $' + (params.length + 1));
    params.push(
      recovery_code_expires_at === null ? null : recovery_code_expires_at
    );
  }

  if (updated_at !== undefined) {
    setClauses.push('updated_at = $' + (params.length + 1));
    params.push(updated_at === null ? null : updated_at);
  }

  if (setClauses.length === 0) {
    return null;
  }

  setClauses.push('updated_at = NOW()');

  const query = `
    UPDATE users
    SET ${setClauses.join(', ')}
    WHERE id = $1
    RETURNING *
  `;

  return await executeQuery(query, params);
};
