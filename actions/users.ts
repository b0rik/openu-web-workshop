'use server';

import { updateUserActiveUnit } from '@/data/users';
import { getUnits } from '@/data/units';
import { getUserByEmail, getUserUnits } from '@/data/users';
import { revalidatePath } from 'next/cache';

export const updateActiveUnit = async (email: string, unit: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: 'User not found' };
    }

    const units = await getUnits();
    const unitNames = units.map((unit) => unit.name);

    if (!unitNames.includes(unit)) {
      return { error: 'Invalid data.' };
    }

    const userUnits = await getUserUnits(email);
    const userUnitsNames = userUnits.map((unit) => unit.name);

    if (!userUnitsNames.includes(unit)) {
      return { error: 'Unit is not authorized for user.' };
    }

    await updateUserActiveUnit(email, unit);

    revalidatePath('/patients');
    revalidatePath('/tasks');
    revalidatePath('/');

    return { success: 'Updated active unit for user.' };
  } catch (error) {
    console.error('error updating active unit', error);
    return { error: 'something went wrong.' };
  }
};
