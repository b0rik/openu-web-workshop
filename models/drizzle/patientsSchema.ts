import { date, pgTable, varchar } from 'drizzle-orm/pg-core';
import { unitsTable } from '@/models/drizzle/unitsSchema';

export const patientsTable = pgTable('patients', {
  id: varchar('id', { length: 9 }).primaryKey().notNull().unique(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  unitName: varchar('unit_name')
    .references(() => unitsTable.name)
    .notNull(),
  roomNumber: varchar('room_number', { length: 50 }),
});
