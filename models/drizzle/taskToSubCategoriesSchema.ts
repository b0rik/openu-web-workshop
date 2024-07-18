import { pgTable, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core';
import { taskSubCategoriesTable } from './taskSubCategoriesSchema';
import { tasksTable } from './tasksSchema';

export const taskToSubCategoriesTable = pgTable(
  'task_to_sub_categories',
  {
    taskId: uuid('task_id')
      .references(() => tasksTable.id)
      .notNull(),
    subCategoryName: varchar('sub_category_name', { length: 50 })
      .references(() => taskSubCategoriesTable.name)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.taskId, table.subCategoryName] }),
    };
  }
);
