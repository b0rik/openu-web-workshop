import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from '@/models/drizzle/rolesSchema';
import { unitsTable } from './unitsSchema';

export const usersTable = pgTable('users', {
  email: varchar('email', { length: 50 }).primaryKey().notNull().unique(),
  hashedPassword: varchar('hashed_password', { length: 72 }).notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  role: varchar('role')
    .references(() => rolesTable.name)
    .notNull(),
  activeUnit: varchar('active_unit').references(() => unitsTable.name),
});
