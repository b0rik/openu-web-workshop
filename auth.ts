import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

import { getUserByUsername } from '@/data/users';

import { LoginFormSchema } from '@/models/FormSchemas';

declare module 'next-auth' {
  interface User {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          try {
            const user = await getUserByUsername(username);
            if (user) {
              const passwordsMatch = await bcrypt.compare(
                password,
                user.hashedPassword
              );

              if (passwordsMatch) {
                const { hashedPassword, ...userData } = user;
                return userData;
              }
            }
          } catch (error) {
            console.error('failed authorizing user.', error);
            throw error;
          }
        }

        return null;
      },
    }),
  ],
});
