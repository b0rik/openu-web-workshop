import { pgTable, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { usersTable } from '@/models/drizzle/usersSchema';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const usersPerUnitTable = pgTable(
  'users_per_unit',
  {
    user_username: varchar('user_username')
      .references(() => usersTable.username)
      .notNull(),
    unit_name: varchar('unit_name')
      .references(() => unitsTable.name)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.user_username, table.unit_name] }),
    };
  },
);
