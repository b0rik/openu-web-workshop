import { auth } from '@/auth';
import { UnitSelect } from '@/components/UnitSelect';
import { getUserUnits } from '@/data/users';

const page = async () => {
  const session = await auth();

  const units = await getUserUnits(session?.user?.username as string);

  return (
    <div className='flex items-center justify-center'>
      <UnitSelect units={units.map((unit) => unit.name)} />
    </div>
  );
};

export default page;
