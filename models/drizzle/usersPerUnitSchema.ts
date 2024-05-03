import { pgTable, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { usersTable } from '@/models/drizzle/usersSchema';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const usersPerUnitTable = pgTable(
  'users_per_unit',
  {
    userUsername: varchar('user_username')
      .references(() => usersTable.username)
      .notNull(),
    unitName: varchar('unit_name')
      .references(() => unitsTable.name)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userUsername, table.unitName] }),
    };
  },
);
