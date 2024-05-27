import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

import { getUserByUsername, getUserByUsernameWithRole } from '@/data/users';

import { LoginFormSchema } from '@/models/FormSchemas';

declare module 'next-auth' {
  interface User {
    canManageUsers: boolean;
    canManagePatients: boolean;
    canManageUnits: boolean;
    canManageTaskSettings: boolean;
    canManageTasks: boolean;
    username: string;
    role: string;
    firstName: string;
    lastName: string;
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
            const user = await getUserByUsernameWithRole(username);
            if (user) {
              const passwordsMatch = await bcrypt.compare(
                password,
                user.users.hashedPassword
              );

              if (passwordsMatch) {
                const { name, hashedPassword, ...userWithRole } = {
                  ...user.users,
                  ...user.roles,
                };
                return userWithRole;
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
  callbacks: {
    jwt: ({ user, token }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }

      return session;
    },
  },
});
