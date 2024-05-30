import { eq } from 'drizzle-orm';
import { db } from '@/data/db';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { tasksTable } from '@/models/drizzle/tasksSchema';

export const getAllPatients = async () => {
  try {
    return await db.select().from(patientsTable);
  } catch (error) {
    throw { message: 'Error getting all patients', error };
  }
};

export const getPatientById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(patientsTable)
      .where(eq(patientsTable.id, id));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting patient by id.', error);
    throw error;
  }
};

export const insertPatient = async (
  patient: typeof patientsTable.$inferInsert
) => {
  try {
    await db.insert(patientsTable).values(patient);
  } catch (error) {
    console.error('Error inserting patient.', error);
    throw error;
  }
};

export const getPatientsWithTasks = async () => {
  try {
    const rows = await db
      .select()
      .from(patientsTable)
      .leftJoin(tasksTable, eq(patientsTable.id, tasksTable.patientId));

    const result = rows.reduce<
      Record<
        string,
        {
          patient: typeof patientsTable.$inferSelect;
          tasks: (typeof tasksTable.$inferSelect)[];
        }
      >
    >((acc, row) => {
      const { patients, tasks } = row;

      if (!acc[patients.id]) {
        acc[patients.id] = { patient: patients, tasks: [] };
      }

      if (tasks) {
        acc[patients.id].tasks.push(tasks);
      }

      return acc;
    }, {});

    return Object.values(result);
  } catch (error) {
    console.error('Error getting patient with tasks by id.', error);
    throw error;
  }
};
