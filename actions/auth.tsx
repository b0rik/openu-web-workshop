'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { getUserByUsername, insertUser } from '@/data/user';
import { getRoles } from '@/data/roles';

import { UserCreateFormSchema } from '@/models/FormSchemas';

const SALT_ROUNDS = 10;

export const createUser = async (
  value: z.infer<typeof UserCreateFormSchema>,
) => {
  const validatedFields = UserCreateFormSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const { firstName, lastName, role, username, password } =
    validatedFields.data;

  const roleNames = await getRoles();

  if (!roleNames.some(({ name: roleName }) => role === roleName)) {
    return { error: 'Invalid data.' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userExists = await getUserByUsername(username);

    if (userExists) {
      return { error: 'User already exists.' };
    }

    await insertUser({
      firstName,
      lastName,
      role,
      username,
      hashedPassword,
    });

    return { success: 'User created.' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Something went wrong.' };
  }
};
