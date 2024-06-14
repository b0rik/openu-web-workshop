import { db } from '@/data/db';
import { taskStatusTable } from '@/models/drizzle/taskStatusSchema';

export const getTaskStatuses = async () => {
  try {
    const result = await db.select().from(taskStatusTable);
    return result; // asusming there are always status in the db
  } catch (error) {
    console.error('Error getting status.', error);
    throw error;
  }
};
