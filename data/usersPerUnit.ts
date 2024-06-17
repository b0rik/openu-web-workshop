import { db } from '@/data/db';

import { usersPerUnitTable } from '@/models/drizzle/usersPerUnitSchema';

export const insertUserPerUnit = async (
  userPerUnit: typeof usersPerUnitTable.$inferInsert
) => {
  try {
    await db.insert(usersPerUnitTable).values(userPerUnit);
  } catch (error) {
    console.error('Error inserting user per unit.', error);
    throw error;
  }
};
