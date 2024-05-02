import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const taskSubCategoriesTable = pgTable('task_sub_categories', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
});
