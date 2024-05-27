import { UserCreateFormSkeleton } from '@/components/auth/UserCreateFormSkeleton';

const loading = () => {
  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <UserCreateFormSkeleton />
    </div>
  );
};
export default loading;
