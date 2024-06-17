import { db } from '@/data/db';

import { taskSubCategoriesTable } from '@/models/drizzle/taskSubCategoriesSchema';
import { eq } from 'drizzle-orm';

export const getTaskSubCategories = async () => {
  try {
    const result = await db.select().from(taskSubCategoriesTable);
    return result; // asusming there are always sub categories in the db
  } catch (error) {
    console.error('Error getting sub categories.', error);
    throw error;
  }
};

export const getTaskSubCategoryByName = async (name: string) => {
  try {
    const result = await db
      .select()
      .from(taskSubCategoriesTable)
      .where(eq(taskSubCategoriesTable.name, name));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting sub category by name.', error);
    throw error;
  }
};
