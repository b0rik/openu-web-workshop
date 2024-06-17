import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

import { getUserByEmailWithRole } from '@/data/users';

import { LoginFormSchema } from '@/models/FormSchemas';

import { usersTable } from './models/drizzle/usersSchema';
import { rolesTable } from './models/drizzle/rolesSchema';

type UserType = Omit<typeof usersTable.$inferSelect, 'hashedPassword'>;
type RoleType = typeof rolesTable.$inferSelect;
declare module 'next-auth' {
  interface User extends UserType, RoleType {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            const user = await getUserByEmailWithRole(email);
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
    jwt: ({ user, token, session }) => {
      if (user) {
        token.user = user;
      }

      if (session?.activeUnit) {
        token.activeUnit = session.activeUnit;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }

      if (token.activeUnit) {
        session.user.activeUnit = token.activeUnit as string;
      }

      return session;
    },
  },
});
