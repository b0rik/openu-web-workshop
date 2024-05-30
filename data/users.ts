import { eq } from 'drizzle-orm';
import { db } from '@/data/db';
import { usersTable } from '@/models/drizzle/usersSchema';
import { rolesTable } from '@/models/drizzle/rolesSchema';
import { usersPerUnitTable } from '@/models/drizzle/usersPerUnitSchema';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const getUserByUsername = async (username: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting user by username.', error);
    throw error;
  }
};

export const getUserByUsernameWithRole = async (username: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.role, rolesTable.name))
      .where(eq(usersTable.username, username));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting user with role by username.', error);
    throw error;
  }
};

export const insertUser = async (user: typeof usersTable.$inferInsert) => {
  try {
    await db.insert(usersTable).values(user);
  } catch (error) {
    console.error('Error inserting user.', error);
    throw error;
  }
};

export const getUserUnits = async (username: string) => {
  try {
    const result = await db
      .select({ unit: unitsTable })
      .from(usersTable)
      .innerJoin(
        usersPerUnitTable,
        eq(usersTable.username, usersPerUnitTable.userUsername)
      )
      .innerJoin(unitsTable, eq(usersPerUnitTable.unitName, unitsTable.name))
      .where(eq(usersTable.username, username));

    const units = result.map(({ unit }) => unit);

    return units;
  } catch (error) {
    console.error('Error getting user units.', error);
    throw error;
  }
};
