import { eq } from 'drizzle-orm';
import { db } from '@/data/db';
import { usersTable } from '@/models/drizzle/usersSchema';

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

export const insertUser = async (user: typeof usersTable.$inferInsert) => {
  try {
    await db.insert(usersTable).values(user);
  } catch (error) {
    console.error('Error inserting user.', error);
    throw error;
  }
};
