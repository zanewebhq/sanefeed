import { executeQuery } from '../database/utils';

export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  verified: boolean;
  verification_code: string | null;
  verification_code_expires_at: Date | null;
  recovery_code: string | null;
  recovery_code_expires_at: Date | null;
  email_change_code: string | null;
  email_change_code_expires_at: Date | null;
  email_change_new: string | null;
  password_change_code: string | null;
  password_change_code_expires_at: Date | null;
  password_change_new: string | null;
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
  const allowedFields = new Set([
    'email',
    'password',
    'verified',
    'verification_code',
    'verification_code_expires_at',
    'recovery_code',
    'recovery_code_expires_at',
    'email_change_code',
    'email_change_code_expires_at',
    'email_change_new',
    'password_change_code',
    'password_change_code_expires_at',
    'password_change_new',
    'updated_at',
  ]);

  const setClauses: string[] = [];
  const params: unknown[] = [id];

  Object.entries(data).forEach(([field, value]) => {
    if (allowedFields.has(field) && value !== undefined) {
      setClauses.push(`${field} = $${params.length + 1}`);
      params.push(value === null ? null : value);
    }
  });

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
