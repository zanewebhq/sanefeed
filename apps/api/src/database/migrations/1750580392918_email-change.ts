import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    ADD COLUMN email_change_code VARCHAR(6),
    ADD COLUMN email_change_code_expires_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN email_change_new VARCHAR(255);
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    DROP COLUMN email_change_code,
    DROP COLUMN email_change_code_expires_at,
    DROP COLUMN email_change_new;
  `);
}
