import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z.string()
    .min(1, { message: 'Username is required.' })
    .max(50, {
      message: 'Username is too long, maximum of 50 characters allowed.'
    }),
  password: z.string()
    .min(1, { message: 'Password is required.' })
})

export const UserCreateFormSchema = z.object({
  firstName: z.string()
    .min(1, { message: 'First name is required.' }),
  lastName: z.string()
    .min(1, { message: 'Last name is required.' }),
  degree: z.string()
    .min(1, { message: 'Degree is required.' }),
  username: z.string()
    .min(1, { message: 'Username is required.' }),
  email: z.string()
    .email({ message: 'Valid email is required.' }),
  password: z.string()
    .regex(new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
    ), {
      message: 'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})