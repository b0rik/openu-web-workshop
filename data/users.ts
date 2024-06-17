import { eq } from 'drizzle-orm';
import { db } from '@/data/db';
import { usersTable } from '@/models/drizzle/usersSchema';
import { rolesTable } from '@/models/drizzle/rolesSchema';
import { usersPerUnitTable } from '@/models/drizzle/usersPerUnitSchema';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const getUsers = async () => {
  try {
    const result = await db.select().from(usersTable);

    const users = result.map((user) => {
      const { hashedPassword, ...rest } = user;
      return rest;
    });

    return users;
  } catch (error) {
    console.error('Error getting user by username.', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting user by email.', error);
    throw error;
  }
};

export const getUserByEmailWithRole = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.role, rolesTable.name))
      .where(eq(usersTable.email, email));

    return result ? result[0] : null;
  } catch (error) {
    console.error('Error getting user with role by email.', error);
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

export const getUserUnits = async (email: string) => {
  try {
    const result = await db
      .select({ unit: unitsTable })
      .from(usersTable)
      .innerJoin(
        usersPerUnitTable,
        eq(usersTable.email, usersPerUnitTable.userEmail)
      )
      .innerJoin(unitsTable, eq(usersPerUnitTable.unitName, unitsTable.name))
      .where(eq(usersTable.email, email));

    const units = result.map(({ unit }) => unit);

    return units;
  } catch (error) {
    console.error('Error getting user units.', error);
    throw error;
  }
};

export const updateUserActiveUnit = async (email: string, unit: string) => {
  try {
    await db
      .update(usersTable)
      .set({ activeUnit: unit })
      .where(eq(usersTable.email, email));
  } catch (error) {
    console.error('Error updating user active unit in db.', error);
    throw error;
  }
};
