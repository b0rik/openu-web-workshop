import { eq } from 'drizzle-orm';
import { db } from '@/data/db';

import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';

export const getTaskCategories = async () => {
  try {
    const result = await db.select().from(taskCategoriesTable);
    return result; // asusming there are always categories in the db
  } catch (error) {
    console.error('Error getting categories.', error);
    throw error;
  }
};

export const getTaskCategoryByName = async (name: string) => {
  try {
    const result = await db
      .select()
      .from(taskCategoriesTable)
      .where(eq(taskCategoriesTable.name, name));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting category by name.', error);
    throw error;
  }
};
