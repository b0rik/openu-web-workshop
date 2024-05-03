import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from '@/models/drizzle/rolesSchema';

export const usersTable = pgTable('users', {
  username: varchar('username', { length: 50 }).primaryKey().notNull().unique(),
  hashedPassword: varchar('hashed_password', { length: 72 }).notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  role: varchar('role')
    .references(() => rolesTable.name)
    .notNull(),
});
