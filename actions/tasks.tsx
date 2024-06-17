'use server';

import { z } from 'zod';

import { revalidatePath } from 'next/cache';

import { insertTask } from '@/data/tasks';
import { TaskCreateFormSchema } from '@/models/FormSchemas';
import { getTaskCategoryByName } from '@/data/taskCategories';
import { getUserByEmail } from '@/data/users';
import { getPatientById } from '@/data/patients';
import { getTaskStatusByName } from '@/data/taskStatus';
import { getTaskSubCategoryByName } from '@/data/taskSubCategories';
import { sendEmailNotificationToUser } from '@/actions/email';

export const createTask = async (
  values: z.infer<typeof TaskCreateFormSchema>
) => {
  const validatedFields = TaskCreateFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const {
    assignedToUser,
    categoryName,
    comments,
    dueDate,
    isUrgent,
    patientId,
    status,
    subCategoryName,
  } = validatedFields.data;

  try {
    if (assignedToUser && assignedToUser !== '') {
      const userExists = getUserByEmail(assignedToUser);

      if (!userExists) {
        return { error: 'Invalid data.' };
      }
    }

    const categoryExists = getTaskCategoryByName(categoryName);

    if (!categoryExists) {
      return { error: 'Invalid data.' };
    }

    if (dueDate && new Date(dueDate) < new Date()) {
      return { error: 'Invalid data.' };
    }

    const patientExists = getPatientById(patientId);

    if (!patientExists) {
      return { error: 'Invalid data.' };
    }

    const statusExists = getTaskStatusByName(status);

    if (!statusExists) {
      return { error: 'Invalid data.' };
    }

    const subCategoryExists = getTaskSubCategoryByName(subCategoryName);

    if (!subCategoryExists) {
      return { error: 'Invalid data.' };
    }

    await insertTask({
      categoryName,
      comments,
      dueDate: dueDate ? new Date(dueDate) : null,
      isUrgent,
      patientId,
      status,
      subCategoryName,
      assignedToUser,
    });

    revalidatePath('/tasks');

    if (assignedToUser) {
      await sendEmailNotificationToUser(assignedToUser);
    }

    return { success: 'Task created.' };
  } catch (error) {
    console.error('Error creating task:', error);
    return { error: 'Something went wrong.' };
  }
};
