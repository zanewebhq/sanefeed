import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    ADD COLUMN password_change_code VARCHAR(6),
    ADD COLUMN password_change_code_expires_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN password_change_new VARCHAR(255);
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    DROP COLUMN password_change_code,
    DROP COLUMN password_change_code_expires_at,
    DROP COLUMN password_change_new;
  `);
}
