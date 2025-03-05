import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    ADD COLUMN verified BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN verification_code VARCHAR(6),
    ADD COLUMN verification_code_expires_at TIMESTAMP WITH TIME ZONE;
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    ALTER TABLE users
    DROP COLUMN verified,
    DROP COLUMN verification_code,
    DROP COLUMN verification_code_expires_at;
  `);
}
