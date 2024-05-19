import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

import { getUserByUsername } from '@/data/user';

import { LoginFormSchema } from '@/models/FormSchemas';

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

          const user = await getUserByUsername(username);

          if (user) {
            const passwordsMatch = await bcrypt.compare(
              password,
              user.hashedPassword
            );

            if (passwordsMatch) {
              return user;
            }
          }
        }

        return null;
      },
    }),
  ],
});
