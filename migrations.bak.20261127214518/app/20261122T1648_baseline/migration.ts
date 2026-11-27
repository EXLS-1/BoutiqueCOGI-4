#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e5bcc01fbc21043d56588a3679058c0ab5f5e14694e211821fcc5a77f7279a8d/contract';
import endContract from '../../snapshots/e5bcc01fbc21043d56588a3679058c0ab5f5e14694e211821fcc5a77f7279a8d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'posts',
        columns: [
          col('author_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('content', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('username', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'posts',
        index: 'posts_author_id_idx_f3862461',
        columns: ['author_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'posts',
        foreignKey: {
          name: 'posts_author_id_fkey',
          columns: ['author_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'posts' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'users' }),
      this.createRlsPolicy({
        schema: 'public',
        table: 'posts',
        policy: {
          naming: { kind: 'wire', prefix: 'posts_public_read', hash: 'fe8f1189' },
          tableName: 'posts',
          namespaceId: 'public',
          operation: 'select',
          roles: ['anon', 'authenticated'],
          using: sql`true`,
          permissive: true,
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
