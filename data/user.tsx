import { sql } from '@vercel/postgres';
import { z } from 'zod';

import { UserCreateFormSchema } from '@/models/FormSchemas';

type CreateUserType = Omit<
  z.infer<typeof UserCreateFormSchema> & { hashedPassword: string },
  'password' | 'confirmPassword'
>;

export const getUserByUsername = async (username: string) => {
  try {
    const { rows } = await sql`
      SELECT * FROM "user" WHERE username = ${username};
    `;

    return rows ? rows[0] : null;
  } catch (error) {
    console.error('Error getting user by username.');
    throw error;
  }
};

export const insertUser = async ({
  firstName,
  lastName,
  degree,
  username,
  hashedPassword,
}: CreateUserType) => {
  try {
    await sql`
      INSERT INTO "user" (
        first_name, 
        last_name, 
        degree, 
        username, 
        hashed_password
      ) VALUES (
        ${firstName},
        ${lastName},
        ${degree},
        ${username},
        ${hashedPassword}
      );
    `;
  } catch (error) {
    console.error('Error creating user.');
    throw error;
  }
};
