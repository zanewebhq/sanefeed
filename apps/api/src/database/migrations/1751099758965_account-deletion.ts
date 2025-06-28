import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    ADD COLUMN deletion_code VARCHAR(6),
    ADD COLUMN deletion_code_expires_at TIMESTAMP WITH TIME ZONE;
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    DROP COLUMN deletion_code,
    DROP COLUMN deletion_code_expires_at;
  `);
}
