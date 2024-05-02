import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from '@/models/drizzle/rolesSchema';

export const usersTable = pgTable('users', {
  username: varchar('username', { length: 50 }).primaryKey().notNull().unique(),
  hashed_password: varchar('hashed_password', { length: 72 }).notNull(),
  first_name: varchar('first_name', { length: 50 }).notNull(),
  last_name: varchar('last_name', { length: 50 }).notNull(),
  role: varchar('role')
    .references(() => rolesTable.name)
    .notNull(),
});
