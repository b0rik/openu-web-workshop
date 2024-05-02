import { date, pgTable, varchar } from 'drizzle-orm/pg-core';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const patientsTable = pgTable('patients', {
  id: varchar('id', { length: 9 }).primaryKey().notNull().unique(),
  first_name: varchar('first_name', { length: 50 }).notNull(),
  last_name: varchar('last_name', { length: 50 }).notNull(),
  date_of_birth: date('date_of_birth').notNull(),
  unit_name: varchar('unit_name')
    .references(() => unitsTable.name)
    .notNull(),
  room_number: varchar('room_number', { length: 50 }),
});
