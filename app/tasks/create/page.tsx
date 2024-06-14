import { CreateTask } from '@/components/create-task/createTask';
import { getTaskCategories } from '@/data/taskCategories';
import { getTaskStatuses } from '@/data/taskStatus';
import { getUsers } from '@/data/users';

const createTaskPage = async () => {
  const taskCategories = await getTaskCategories();
  const taskStatuses = await getTaskStatuses();
  const users = await getUsers();

  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <CreateTask
        taskCategories={taskCategories}
        taskStatuses={taskStatuses}
        users={users}
      />
    </div>
  );
};

export default createTaskPage;
