import { db } from '@/data/db';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const getUnits = async () => {
  try {
    const result = await db.select().from(unitsTable);
    return result; // asusming there are always units in the db
  } catch (error) {
    console.error('Error getting units.', error);
    throw error;
  }
};
