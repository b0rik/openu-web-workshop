import { CreateTaskSkeleton } from '@/components/create-task/createTaskSkeleton';

const loading = () => {
  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <CreateTaskSkeleton />
    </div>
  );
};
export default loading;
