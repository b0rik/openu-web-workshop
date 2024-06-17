import { UserCreateForm } from '@/components/auth/UserCreateForm';
import { getRoles } from '@/data/roles';
import { getUnits } from '@/data/units';

const UserCreatePage = async () => {
  const roles = await getRoles();
  const units = await getUnits();

  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <UserCreateForm
        roles={roles.map((role) => role.name)}
        units={units.map((unit) => unit.name)}
      />
    </div>
  );
};

export default UserCreatePage;
