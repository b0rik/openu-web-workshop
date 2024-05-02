import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core';

export const rolesTable = pgTable('roles', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
  can_manage_users: boolean('can_manage_users').notNull(),
  can_manage_patients: boolean('can_manage_patients').notNull(),
  can_manage_units: boolean('can_manage_units').notNull(),
  can_manage_task_settings: boolean('can_manage_task_settings').notNull(),
  can_manage_tasks: boolean('can_manage_tasks').notNull(),
});
