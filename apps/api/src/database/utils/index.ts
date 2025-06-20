import { pool } from '..';

export async function executeQuery<T>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows.at(0) || null;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database operation failed');
  } finally {
    client.release();
  }
}

export async function executeMultiQuery<T>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database operation failed');
  } finally {
    client.release();
  }
}
