import { z } from 'zod'

// TODO:
// max length const

export const LoginFormSchema = z.object({
  username: z.string()
    .min(1, { message: 'Username is required.' }),
  password: z.string()
    .min(1, { message: 'Password is required.' })
})

export const UserCreateFormSchema = z.object({
  firstName: z.string()
    .min(1, { message: 'First name is required.' })
    .max(255, { 
      message: 'First name is too long. Maximum 255 characters allowed.' 
    }),
  lastName: z.string()
    .min(1, { message: 'Last name is required.' })
    .max(255, { 
      message: 'Last name is too long. Maximum 255 characters allowed.' 
    }),
  degree: z.string()
    .min(1, { message: 'Degree is required.' })
    .max(255, { 
      message: 'Degree is too long. Maximum 255 characters allowed.' 
    }),
  username: z.string()
    .min(1, { message: 'Username is required.' })
    .max(255, { 
      message: 'Username is too long. Maximum 255 characters allowed.' 
    }),
  password: z.string()
    .regex(new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
    ), {
      message: 'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
    })
    .max(255, { 
      message: 'Password is too long. Maximum 255 characters allowed.' 
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})