import { eq } from 'drizzle-orm';
import { db } from '@/data/db';
import { patientsTable } from '@/models/drizzle/patientsSchema';

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
