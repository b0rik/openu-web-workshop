'use server';

import { updateUserActiveUnit } from '@/data/users';
import { getUnits } from '@/data/units';
import { getUserByUsername, getUserUnits } from '@/data/users';
import { revalidatePath } from 'next/cache';

export const updateActiveUnit = async (username: string, unit: string) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return { error: 'User not found' };
    }

    const units = await getUnits();
    const unitNames = units.map((unit) => unit.name);

    if (!unitNames.includes(unit)) {
      return { error: 'Invalid data.' };
    }

    const userUnits = await getUserUnits(username);
    const userUnitsNames = userUnits.map((unit) => unit.name);

    if (!userUnitsNames.includes(unit)) {
      return { error: 'Unit is not authorized for user.' };
    }

    await updateUserActiveUnit(username, unit);

    revalidatePath('/patients');
    revalidatePath('/tasks');

    return { success: 'Updated active unit for user.' };
  } catch (error) {
    console.error('error updating active unit', error);
    return { error: 'something went wrong.' };
  }
};
