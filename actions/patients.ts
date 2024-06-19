'use server';

import { z } from 'zod';

import { revalidatePath } from 'next/cache';

import { deletePatient, getPatientById, insertPatient } from '@/data/patients';
import { getUnits } from '@/data/units';

import { PatientCreateFormSchema } from '@/models/FormSchemas';
import { deleteTask, getTasksByPatientId } from '@/data/tasks';

export const createPatient = async (
  values: z.infer<typeof PatientCreateFormSchema>
) => {
  const validatedFields = PatientCreateFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid data.' };
  }

  const { id, firstName, lastName, dateOfBirth, unitName, roomNumber } =
    validatedFields.data;

  try {
    const unitNames = await getUnits();

    if (!unitNames.some(({ name: unit }) => unitName === unit)) {
      return { error: 'Invalid data.' };
    }

    const patientExists = await getPatientById(id);

    if (patientExists) {
      return { error: 'Patient already exists.' };
    }

    if (new Date(dateOfBirth) > new Date()) {
      return { error: 'Invalid data.' };
    }

    //date is one day offset because of time zone diff
    const fixedDate = new Date(dateOfBirth);
    fixedDate.setDate(fixedDate.getDate() + 1);

    await insertPatient({
      id,
      firstName,
      lastName,
      dateOfBirth: fixedDate,
      unitName,
      roomNumber,
    });

    revalidatePath('/patients');

    return { success: 'Patient created.' };
  } catch (error) {
    console.error('Error creating patient:', error);
    return { error: 'Something went wrong.' };
  }
};

export const removePatient = async (id: string) => {
  try {
    const patientsTasks = await getTasksByPatientId(id);
    patientsTasks.forEach(async (task) => await deleteTask(task.id));

    await deletePatient(id);

    revalidatePath('/patients');

    return { success: 'Deleted patient.' };
  } catch (error) {
    {
      console.error('Error deleting patient', error);
      return { error: 'Something went wrong.' };
    }
  }
};
