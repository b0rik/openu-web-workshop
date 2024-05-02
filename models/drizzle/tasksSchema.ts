import {
  boolean,
  date,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';
import { taskSubCategoriesTable } from '@/models/drizzle/taskSubCategoriesSchema';
import { taskStatusTable } from '@/models/drizzle/taskStatusSchema';
import { usersTable } from '@/models/drizzle/usersSchema';

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().notNull().unique(),
  category_name: varchar('category_name')
    .references(() => taskCategoriesTable.name)
    .notNull(),
  sub_category_name: varchar('sub_category_name')
    .references(() => taskSubCategoriesTable.name)
    .notNull(),
  comments: text('comments'),
  status: text('status')
    .references(() => taskStatusTable.name)
    .notNull(),
  assigned_to_user: varchar('assigned_to_user').references(
    () => usersTable.username,
  ),
  due_date: date('due_date'),
  is_urgent: boolean('is_urgent'),
});
