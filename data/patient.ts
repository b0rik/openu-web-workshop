import { db } from '@/data/db';
import { patientsTable } from '@/models/drizzle/patientsSchema';

export const getAllPatients = async () => {
  try {
    return await db.select().from(patientsTable);
  } catch (error) {
    throw { message: 'Error getting all patients', error };
  }
};
