import { db } from '@/data/db';
import { rolesTable } from '@/models/drizzle/rolesSchema';

export const getRoles = async () => {
  try {
    const result = await db.select().from(rolesTable);
    return result; // asusming there are always roles in the db
  } catch (error) {
    console.error('Error getting roles.', error);
    throw error;
  }
};
