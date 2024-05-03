import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core';

export const rolesTable = pgTable('roles', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
  canManageUsers: boolean('can_manage_users').notNull(),
  canManagePatients: boolean('can_manage_patients').notNull(),
  canManageUnits: boolean('can_manage_units').notNull(),
  canManageTaskSettings: boolean('can_manage_task_settings').notNull(),
  canManageTasks: boolean('can_manage_tasks').notNull(),
});
