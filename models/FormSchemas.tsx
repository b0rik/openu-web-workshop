import { z } from 'zod';

import {
  containsDigit,
  containsLowerLetter,
  containsSymbol,
  containsUpperLetter,
  containsWhitespace,
} from '@/lib/utils';

// TODO:
// max length const

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: 'username required.' }),
  password: z.string().min(1, { message: 'password required.' }),
});

export const UserCreateFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'first name required.' }).max(50, {
      message: 'first name is too long, max 50 allowed.',
    }),
    lastName: z.string().min(1, { message: 'last name required' }).max(50, {
      message: 'last name is too long, max 50 allowed.',
    }),
    username: z.string().min(1, { message: 'user name required' }).max(50, {
      message: 'username is too long, max 50 allowed.',
    }),
    password: z
      .string()
      .min(8, { message: 'password must containt at least 8 characters.' })
      .max(50, {
        message: 'password is too long, max 50 allowed.',
      }),
    confirmPassword: z.string(),
    role: z.string().min(1, 'role is required.'),
  })
  .refine((data) => !containsWhitespace(data.username), {
    message: 'username cannot contain whitespace.',
    path: ['username'],
  })
  .refine((data) => containsUpperLetter(data.password), {
    message: 'password must contain at least 1 upper case letter.',
    path: ['password'],
  })
  .refine((data) => containsLowerLetter(data.password), {
    message: 'password must contain at least 1 lower case letter.',
    path: ['password'],
  })
  .refine((data) => containsDigit(data.password), {
    message: 'password must contain at least 1 digit.',
    path: ['password'],
  })
  .refine((data) => containsSymbol(data.password), {
    message: 'password must contain at least 1 special symbol.',
    path: ['password'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords dont match.',
    path: ['confirmPassword'],
  });
