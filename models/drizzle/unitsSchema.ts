import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const unitsTable = pgTable('units', {
  name: varchar('name', { length: 50 }).primaryKey().notNull().unique(),
});
