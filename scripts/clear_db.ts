import 'dotenv/config';

import { db } from '@/data/db';
import { tasksTable } from '@/models/drizzle/tasksSchema';
import { usersPerUnitTable } from '@/models/drizzle/usersPerUnitSchema';
import { usersTable } from '@/models/drizzle/usersSchema';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { taskSubCategoriesTable } from '@/models/drizzle/taskSubCategoriesSchema';
import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';
import { rolesTable } from '@/models/drizzle/rolesSchema';
import { taskStatusTable } from '@/models/drizzle/taskStatusSchema';
import { unitsTable } from '@/models/drizzle/unitsSchema';

const main = async () => {
  try {
    await db.delete(tasksTable);
    await db.delete(usersPerUnitTable);
    await db.delete(usersTable);
    await db.delete(patientsTable);
    await db.delete(taskSubCategoriesTable);
    await db.delete(taskCategoriesTable);
    await db.delete(rolesTable);
    await db.delete(taskStatusTable);
    await db.delete(unitsTable);

    console.log('database cleared.');
  } catch (error) {
    console.error(error);
  }
};

main();
