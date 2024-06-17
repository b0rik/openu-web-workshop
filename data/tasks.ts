import { db } from '@/data/db';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { tasksTable } from '@/models/drizzle/tasksSchema';
import { eq } from 'drizzle-orm';

export type TaskWithPatientType = {
  taskDetails: typeof tasksTable.$inferSelect;
  patient: typeof patientsTable.$inferSelect;
};

export const getTasksWithPatient = async () => {
  try {
    const result = await db
      .select({
        taskDetails: tasksTable,
        patient: patientsTable,
      })
      .from(tasksTable)
      .innerJoin(patientsTable, eq(patientsTable.id, tasksTable.patientId));
    return result;
  } catch (error) {
    console.error('Error getting tasks.', error);
    throw error;
  }
};

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

export const insertTask = async (task: typeof tasksTable.$inferInsert) => {
  try {
    await db.insert(tasksTable).values(task);
  } catch (error) {
    console.error('Error inserting task.', error);
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting task by id.', error);
    throw error;
  }
};

export const updateTaskStatus = async (id: string, newStatus: string) => {
  try {
    await db
      .update(tasksTable)
      .set({ status: newStatus })
      .where(eq(tasksTable.id, id));
  } catch (error) {
    console.error('Error updating task status.', error);
    throw error;
  }
};
