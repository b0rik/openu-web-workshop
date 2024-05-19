'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { signIn } from '@/auth';

import { getUserByUsername, insertUser } from '@/data/user';
import { getRoles } from '@/data/roles';

import { UserCreateFormSchema, LoginFormSchema } from '@/models/FormSchemas';

const SALT_ROUNDS = 10;

export const createUser = async (
  values: z.infer<typeof UserCreateFormSchema>
) => {
  const validatedFields = UserCreateFormSchema.safeParse(values);

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

export const loginUser = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = UserCreateFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn('credentials', { username, password });
    return { success: 'You are logged in!' };
  } catch (error) {
    console.error('error login in user: ', error);
    return { error: 'Wrong credentials.' };
  }
};
