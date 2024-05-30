import { eq } from 'drizzle-orm';
import { db } from '@/data/db';
import { tasksTable } from '@/models/drizzle/tasksSchema';

export const getTasksByPatientId = async (patientId: string) => {
  try {
    const result = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.patientId, patientId));

    return result;
  } catch (error) {
    console.error('Error getting tasks by patient id.', error);
    throw error;
  }
};
