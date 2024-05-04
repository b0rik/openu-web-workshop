import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';

export const taskSubCategoriesTable = pgTable('task_sub_categories', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
  categoryName: varchar('category_name')
    .references(() => taskCategoriesTable.name)
    .notNull(),
});
