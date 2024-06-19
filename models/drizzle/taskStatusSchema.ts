import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const taskStatusTable = pgTable('task_status', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
  color: varchar('color', { length: 50 }).notNull(),
});
