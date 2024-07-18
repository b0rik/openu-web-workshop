import { eq } from 'drizzle-orm';

import { db } from '@/data/db';

import { taskToSubCategoriesTable } from '@/models/drizzle/taskToSubCategoriesSchema';

export const insertTaskToSubCategory = async (
  taskToSubCategory: typeof taskToSubCategoriesTable.$inferInsert
) => {
  try {
    await db
      .insert(taskToSubCategoriesTable)
      .values(taskToSubCategory)
      .returning();
  } catch (error) {
    console.error('Error inserting task to sub category.', error);
    throw error;
  }
};

export const getTaskToSubCategoriesByTaskId = async (taskId: string) => {
  try {
    const result = await db
      .select()
      .from(taskToSubCategoriesTable)
      .where(eq(taskToSubCategoriesTable.taskId, taskId));

    return result;
  } catch (error) {
    console.error('Error getting task to sub category.', error);
    throw error;
  }
};

export const deleteTaskToSubCategoriesByTaskId = async (taskId: string) => {
  try {
    await db
      .delete(taskToSubCategoriesTable)
      .where(eq(taskToSubCategoriesTable.taskId, taskId));
  } catch (error) {
    console.error('Error deleting task to sub category.', error);
    throw error;
  }
};
