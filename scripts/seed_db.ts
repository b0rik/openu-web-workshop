import 'dotenv/config';

import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

import { unitsTable } from '@/models/drizzle/unitsSchema';

const units: (typeof unitsTable.$inferInsert)[] = [
  {
    name: 'Internal Medicine A',
  },
  {
    name: 'General Surgery B',
  },
];

import { taskStatusTable } from '@/models/drizzle/taskStatusSchema';

const taskStatus: (typeof taskStatusTable.$inferInsert)[] = [
  {
    name: 'Pending',
  },
  {
    name: 'In progress',
  },
  {
    name: 'Complete',
  },
];

import { rolesTable } from '@/models/drizzle/rolesSchema';

const roles: (typeof rolesTable.$inferInsert)[] = [
  {
    name: 'admin',
    canManageUsers: true,
    canManagePatients: true,
    canManageUnits: true,
    canManageTaskSettings: true,
    canManageTasks: true,
  },
  {
    name: 'doctor',
    canManageUsers: false,
    canManagePatients: true,
    canManageUnits: false,
    canManageTaskSettings: false,
    canManageTasks: true,
  },
  {
    name: 'shift manager',
    canManageUsers: false,
    canManagePatients: true,
    canManageUnits: false,
    canManageTaskSettings: true,
    canManageTasks: true,
  },
];

import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';

const taskCategories: (typeof taskCategoriesTable.$inferInsert)[] = [
  {
    name: 'Imaging',
    iconName: 'camera',
  },
  {
    name: 'Consult',
    iconName: 'contact',
  },
  {
    name: 'Laboratory',
    iconName: 'test-tube',
  },
  {
    name: 'Letters',
    iconName: 'mails',
  },
  {
    name: 'Discharge',
    iconName: 'user-check',
  },
];

import { taskSubCategoriesTable } from '@/models/drizzle/taskSubCategoriesSchema';

const taskSubCategories: (typeof taskSubCategoriesTable.$inferInsert)[] = [
  {
    name: 'US',
    categoryName: 'Imaging',
  },
  {
    name: 'X-Ray',
    categoryName: 'Imaging',
  },
  {
    name: 'Hematology',
    categoryName: 'Laboratory',
  },
  {
    name: 'Complete Blood Count',
    categoryName: 'Laboratory',
  },
];
import { patientsTable } from '@/models/drizzle/patientsSchema';

const createPatient = () => {
  const patient: typeof patientsTable.$inferInsert = {
    id: faker.string.numeric({ length: 9, allowLeadingZeros: true }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.birthdate(),
    unitName: faker.helpers.arrayElement(units).name,
  };

  if (faker.helpers.maybe(() => true)) {
    patient.roomNumber = faker.string.numeric({
      length: 3,
      allowLeadingZeros: true,
    });
  }

  return patient;
};

const patients: (typeof patientsTable.$inferInsert)[] = Array(10)
  .fill(0)
  .map((_) => createPatient());

import { usersTable } from '@/models/drizzle/usersSchema';

const createUser = (() => {
  const SALT_ROUNDS = 10;
  const PASSWORD = 'aA!23456';
  const emailBase = '@meditaskmanager.com';
  const emails = new Set();

  return (role: 'admin' | 'shift manager' | 'doctor') => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    let email = firstName + lastName + emailBase;

    let num = 1;
    while (emails.has(email)) {
      email = firstName + lastName + num++ + emailBase;
    }

    emails.add(email);

    const hashedPassword = bcrypt.hashSync(PASSWORD, SALT_ROUNDS);

    const activeUnit = faker.helpers.maybe(() => true, { probability: 0.8 })
      ? faker.helpers.arrayElement(units).name
      : null;

    return {
      firstName,
      lastName,
      email,
      hashedPassword,
      role,
      activeUnit,
    };
  };
})();

const users: (typeof usersTable.$inferInsert)[] = Array(5)
  .fill(0)
  .map((_) => createUser('doctor'));
users.push(createUser('admin'));
users.push(createUser('shift manager'));

import { usersPerUnitTable } from '@/models/drizzle/usersPerUnitSchema';

const usersPerUnit: (typeof usersPerUnitTable.$inferInsert)[] = users.map(
  ({ email }) => ({
    userEmail: email,
    unitName: faker.helpers.arrayElement(units).name,
  })
);

import { tasksTable } from '@/models/drizzle/tasksSchema';

const createTask = () => {
  const taskSubCategory = faker.helpers.arrayElement(taskSubCategories);

  const task: typeof tasksTable.$inferInsert = {
    categoryName: taskSubCategory.categoryName,
    subCategoryName: taskSubCategory.name,
    status: faker.helpers.arrayElement(taskStatus).name,
    isUrgent: faker.helpers.maybe(() => true) || false,
    patientId: faker.helpers.arrayElement(patients).id,
  };

  if (faker.helpers.maybe(() => true, { probability: 0.8 })) {
    task.assignedToUser = faker.helpers.arrayElement(users).email;
  }

  if (faker.helpers.maybe(() => true, { probability: 0.7 })) {
    task.dueDate = faker.date.soon({ days: 10 });
  }

  if (faker.helpers.maybe(() => true, { probability: 0.3 })) {
    task.comments = faker.lorem.words({ min: 3, max: 7 });
  }

  return task;
};

const tasks: (typeof tasksTable.$inferInsert)[] = Array(20)
  .fill(0)
  .map((_) => createTask());

import { db } from '@/data/db';

const main = async () => {
  try {
    await db.insert(unitsTable).values(units);
    await db.insert(taskStatusTable).values(taskStatus);
    await db.insert(rolesTable).values(roles);
    await db.insert(taskCategoriesTable).values(taskCategories);
    await db.insert(taskSubCategoriesTable).values(taskSubCategories);
    await db.insert(patientsTable).values(patients);
    await db.insert(usersTable).values(users);
    await db.insert(usersPerUnitTable).values(usersPerUnit);
    await db.insert(tasksTable).values(tasks);

    console.log('database seeded.');
  } catch (error) {
    console.error(error);
  }
};

main();
