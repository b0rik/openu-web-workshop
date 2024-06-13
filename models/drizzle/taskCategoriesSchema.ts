import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const taskCategoriesTable = pgTable('task_categories', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
  // iconName: varchar('name', { length: 50 }).notNull(),
});
