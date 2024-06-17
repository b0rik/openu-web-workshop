import { CreateTask } from '@/components/create-task/createTask';
import { getTaskCategories } from '@/data/taskCategories';
import { getTaskStatuses } from '@/data/taskStatus';
import { getUsers } from '@/data/users';
import { getTaskSubCategories } from '@/data/taskSubCategories';

const createTaskPage = async () => {
  const taskCategories = await getTaskCategories();
  const taskStatuses = await getTaskStatuses();
  const users = await getUsers();
  const taskSubCategories = await getTaskSubCategories();

  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <CreateTask
        taskCategories={taskCategories}
        taskStatuses={taskStatuses}
        users={users}
        taskSubCategories={taskSubCategories}
      />
    </div>
  );
};

export default createTaskPage;
