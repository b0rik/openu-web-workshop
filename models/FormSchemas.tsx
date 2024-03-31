import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string()
    .min(1, { 
      message: 'Username is required.' 
    })
    .max(50, { 
      message: 'Username is too long, maximum of 50 characters allowed.' 
    }),
  password: z.string()
    .min(1, { message: 'Password is required.' })
})