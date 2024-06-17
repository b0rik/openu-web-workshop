import { pgTable, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { usersTable } from '@/models/drizzle/usersSchema';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const usersPerUnitTable = pgTable(
  'users_per_unit',
  {
    userEmail: varchar('user_username')
      .references(() => usersTable.email)
      .notNull(),
    unitName: varchar('unit_name')
      .references(() => unitsTable.name)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userEmail, table.unitName] }),
    };
  }
);
