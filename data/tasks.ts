import { db } from '@/data/db'
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { tasksTable } from '@/models/drizzle/tasksSchema'
import { eq } from 'drizzle-orm';

export const getTasksWithPatient = async () => {
    try {
      const result = await db
        .select({
          taskDetails: tasksTable,
          patient: patientsTable
        })
        .from(tasksTable)
        .innerJoin(patientsTable, eq(patientsTable.id, tasksTable.patientId));
      return result; 
    } catch (error) {
      console.error('Error getting tasks.', error);
      throw error;
    }
  };