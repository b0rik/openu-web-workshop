import { z } from 'zod';

import {
  containsDigit,
  containsLowerLetter,
  containsSymbol,
  containsUpperLetter,
} from '@/lib/utils';

// TODO:
// max length const

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: '.חובה להזין שם משתמש' }),
  password: z.string().min(1, { message: '.חובה להזין סיסמה' }),
});

export const UserCreateFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'חובה להזין שם פרטי.' }).max(255, {
      message: 'שם פרטי ארוך מדי. מותר 50 תוים לכל היותר.',
    }),
    lastName: z.string().min(1, { message: 'חובה להזין שם משפחה.' }).max(255, {
      message: 'שם משפחה ארוך מדי. מותר 50 תוים לכל היותר.',
    }),
    degree: z.string().min(1, { message: 'חובה להזין תואר.' }).max(255, {
      message: 'תואר ארוך מדי. מותר 50 תוים לכל היותר.',
    }),
    username: z.string().min(1, { message: 'חובה להזין שם משתמש.' }).max(255, {
      message: 'שם משתמש ארוך מדי. מותר להזין 50 תוים לכל היותר.',
    }),
    password: z
      .string()
      .min(8, { message: 'הסיסמה חייבת להכיל לפחות 8 תוים.' })
      .max(50, {
        message: 'סיסמה ארוכה מדי. מותר 50 תוים לכל היותר.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => containsUpperLetter(data.password), {
    message: 'הסיסמה חייבת להכיל לפחות אות לועזית גדולה אחת.',
    path: ['password'],
  })
  .refine((data) => containsLowerLetter(data.password), {
    message: 'הסיסמה חייבת להכיל לפחות אות לועזית קטנה אחת.',
    path: ['password'],
  })
  .refine((data) => containsDigit(data.password), {
    message: 'הסיסמה חייבת להכיל לפחות מספר אחד.',
    path: ['password'],
  })
  .refine((data) => containsSymbol(data.password), {
    message: 'הסיסמה חייבת להכיל לפחות סימן אחד.',
    path: ['password'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'סיסמאות לא תואמות.',
    path: ['confirmPassword'],
  });
