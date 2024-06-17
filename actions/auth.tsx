'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

import { getUserByUsername, insertUser } from '@/data/users';
import { getRoles } from '@/data/roles';
import { getUnits } from '@/data/units';

import { UserCreateFormSchema, LoginFormSchema } from '@/models/FormSchemas';
import { insertUserPerUnit } from '@/data/usersPerUnit';

const SALT_ROUNDS = 10;

export const createUser = async (
  values: z.infer<typeof UserCreateFormSchema>
) => {
  const validatedFields = UserCreateFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const {
    firstName,
    lastName,
    role,
    username,
    password,
    userUnits,
    confirmPassword,
  } = validatedFields.data;

  try {
    const roleNames = await getRoles();

    if (!roleNames.some(({ name: roleName }) => role === roleName)) {
      return { error: 'Invalid data.' };
    }

    const units = await getUnits();
    const unitsNames = units.map(({ name }) => name);

    userUnits.forEach((unit) => {
      if (!unitsNames.includes(unit)) {
        return { error: 'Invalid data.' };
      }
    });

    if (password !== confirmPassword) {
      return { error: 'Invalid data.' };
    }
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

    userUnits.forEach(async (unit) => {
      await insertUserPerUnit({ unitName: unit, userUsername: username });
    });

    return { success: 'User created.' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Something went wrong.' };
  }
};

export const loginUser = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Wrong credentials.' };
      }

      console.error('error login in user: ', error);
      return { error: 'Something went wrong.' };
    }

    throw error;
  }
};

export const logoutUser = async () => {
  await signOut({ redirectTo: '/auth/login' });
};
