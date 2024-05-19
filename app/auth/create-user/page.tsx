import { UserCreateForm } from '@/components/auth/UserCreateForm';
import { getRoles } from '@/data/roles';

const UserCreatePage = async () => {
  const roles = await getRoles();

  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <UserCreateForm roles={roles.map((role) => role.name)} />
    </div>
  );
};

export default UserCreatePage;
