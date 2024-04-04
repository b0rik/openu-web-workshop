import { z } from 'zod';

// TODO:
// max length const

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: '.חובה להזין שם משתמש' }),
  password: z.string().min(1, { message: '.חובה להזין סיסמה' }),
});

export const UserCreateFormSchema = z
  .object({
    firstName: z.string().min(1, { message: '.חובה להזין שם פרטי' }).max(255, {
      message: '.שם פרטי ארוך מדי. מותר 50 תוים לכל היותר',
    }),
    lastName: z.string().min(1, { message: 'חובה להזין שם משפחה' }).max(255, {
      message: 'שם משפחה ארוך מדי. מותר 50 תוים לכל היותר',
    }),
    degree: z.string().min(1, { message: 'חובה להזין תואר.' }).max(255, {
      message: 'תואר ארוך מדי. מותר 50 תוים לכל היותר',
    }),
    username: z.string().min(1, { message: 'חובה להזין שם משתמש.' }).max(255, {
      message: 'שם משתמש ארוך מדי. מותר 50 תוים לכל היותר',
    }),
    password: z
      .string()
      .regex(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
        ),
        {
          message:
            'הסיסמה צריכה להכיל - 8 תוים לפחות, לפחות אות גדולה אחת, לפחות אות קטנה אחת, לפחות מספר אחד ולפחות תו מיוחד אחד(אותיות באנגלית).',
        }
      )
      .max(255, {
        message: 'סיסמה ארוכה מדי. מותר 50 תוים לכל היותר',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'סיסמאות לא תואמות.',
    path: ['confirmPassword'],
  });
