import { z } from 'zod';

import {
  containsDigit,
  containsLowerLetter,
  containsSymbol,
  containsUpperLetter,
  containsWhitespace,
  isDigits,
} from '@/lib/utils';

const MAX_LENGTH = 50;

export const LoginFormSchema = z.object({
  email: z.string().min(1, { message: 'email required.' }),
  password: z.string().min(1, { message: 'password required.' }),
});

export const UserCreateFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'first name required.' })
      .max(MAX_LENGTH, {
        message: `first name is too long, max ${MAX_LENGTH} allowed.`,
      }),
    lastName: z
      .string()
      .min(1, { message: 'last name required' })
      .max(MAX_LENGTH, {
        message: `last name is too long, max ${MAX_LENGTH} allowed.`,
      }),
    email: z
      .string()
      .email()
      .min(1, { message: 'email required' })
      .max(MAX_LENGTH, {
        message: `email is too long, max ${MAX_LENGTH} allowed.`,
      }),
    password: z
      .string()
      .min(8, { message: `password must containt at least 8 characters.` })
      .max(MAX_LENGTH, {
        message: `password is too long, max ${MAX_LENGTH} allowed.`,
      }),
    confirmPassword: z.string(),
    role: z.string().min(1, 'role is required.'),
    userUnits: z.string().array(),
  })
  .refine((data) => !containsWhitespace(data.email), {
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

export const PatientCreateFormSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'id required.' })
    .length(9, { message: 'id length must be 9.' })
    .refine(isDigits, { message: 'id must containt only numbers.' }),
  firstName: z
    .string()
    .min(1, { message: 'first name required.' })
    .max(MAX_LENGTH, {
      message: `first name is too long, max ${MAX_LENGTH} allowed.`,
    }),
  lastName: z
    .string()
    .min(1, { message: 'last name required' })
    .max(MAX_LENGTH, {
      message: `last name is too long, max ${MAX_LENGTH} allowed.`,
    }),
  dateOfBirth: z
    .string()
    .date()
    .refine(
      (val) => {
        return new Date(val) <= new Date();
      },
      { message: 'birth date invalid.' }
    ),
  unitName: z
    .string()
    .min(1, { message: 'unit required.' })
    .max(MAX_LENGTH, {
      message: `unit name is to long, max ${MAX_LENGTH} allowed.`,
    }),
  roomNumber: z
    .string()
    .max(MAX_LENGTH, {
      message: `room number is to long, max ${MAX_LENGTH} allowed.`,
    })
    .refine(isDigits, { message: 'room number must contain only numbers.' }),
});

export const TaskCreateFormSchema = z.object({
  categoryName: z.string().min(1, { message: 'category required.' }),
  subCategoryName: z.string().min(1, { message: 'sub category required.' }),
  comments: z.string().optional(),
  status: z.string().min(1, { message: 'status is required.' }),
  assignedToUser: z.string().optional(),
  dueDate: z
    .date()
    .refine(
      (val) => {
        return new Date(val) >= new Date();
      },
      { message: 'due date invalid.' }
    )
    .optional(),
  isUrgent: z.boolean(),
  patientId: z.string().min(1, { message: 'patient id required.' }),
});

export const TaskEditFormSchema = TaskCreateFormSchema.extend({
  id: z.string().min(1, { message: 'id required' }),
  dueDate: z.date().optional(),
});
