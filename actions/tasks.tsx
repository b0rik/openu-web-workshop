'use server';

import { z } from 'zod';

import { revalidatePath } from 'next/cache';

import {
  deleteTask,
  getTaskById,
  insertTask,
  updateTask,
  updateTaskStatus,
} from '@/data/tasks';
import { TaskCreateFormSchema, TaskEditFormSchema } from '@/models/FormSchemas';
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

export const editTask = async (values: z.infer<typeof TaskEditFormSchema>) => {
  const validatedFields = TaskEditFormSchema.safeParse(values);

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
    id,
  } = validatedFields.data;

  try {
    const taskExists = await getTaskById(id);

    if (!taskExists) {
      return { error: 'invalid data.' };
    }

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

    await updateTask({
      id,
      categoryName,
      comments: comments || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      isUrgent,
      patientId,
      status,
      subCategoryName,
      assignedToUser: assignedToUser || null,
    });

    revalidatePath('/tasks');

    if (assignedToUser) {
      await sendEmailNotificationToUser(assignedToUser);
    }

    return { success: 'Task edited.' };
  } catch (error) {
    console.error('Error editing task:', error);
    return { error: 'Something went wrong.' };
  }
};

export const updateStatus = async (id: string, newStatus: string) => {
  try {
    const task = await getTaskById(id);

    if (!task) {
      return { error: 'Invalid data.' };
    }

    const statusExists = await getTaskStatusByName(newStatus);

    if (!statusExists) {
      return { error: 'Invalid data.' };
    }

    await updateTaskStatus(id, newStatus);

    revalidatePath('/tasks');

    return { success: 'Updated status.' };
  } catch (error) {
    {
      console.error('Error updating status', error);
      return { error: 'Something went wrong.' };
    }
  }
};

export const removeTask = async (id: string) => {
  try {
    await deleteTask(id);

    revalidatePath('/tasks');
    revalidatePath('/');

    return { success: 'Deleted task.' };
  } catch (error) {
    {
      console.error('Error deleting task', error);
      return { error: 'Something went wrong.' };
    }
  }
};
