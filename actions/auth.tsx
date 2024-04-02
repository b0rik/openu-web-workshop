'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { getUserByUsername, insertUser } from '@/data/user'

import { UserCreateFormSchema } from '@/models/FormSchemas'

const SALT_ROUNDS = 10;

export const createUser = async (
  value: z.infer<typeof UserCreateFormSchema>
) => {
  const validatedFields = UserCreateFormSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const { 
    firstName, 
    lastName, 
    degree, 
    username, 
    password,
    confirmPassword,
  } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
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
      degree, 
      username, 
      hashedPassword
    });

    return { success: 'User created.' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Something went wrong.' }
  }
}