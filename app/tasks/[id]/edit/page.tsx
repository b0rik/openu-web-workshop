import { getTaskCategories } from '@/data/taskCategories';
import { getTaskStatuses } from '@/data/taskStatus';
import { getUsers } from '@/data/users';
import { getTaskSubCategories } from '@/data/taskSubCategories';
import { EditTask } from '@/components/edit-task/EditTask';
import { getTaskWithPatientById } from '@/data/tasks';

const editTaskPage = async ({ params }: { params: { id: string } }) => {
  const taskCategories = await getTaskCategories();
  const taskStatuses = await getTaskStatuses();
  const users = await getUsers();
  const taskSubCategories = await getTaskSubCategories();
  const task = await getTaskWithPatientById(params.id);

  if (!task) {
    return <div>invalid task id.</div>;
  }
  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <EditTask
        taskCategories={taskCategories}
        taskStatuses={taskStatuses}
        users={users}
        taskSubCategories={taskSubCategories}
        task={task}
      />
    </div>
  );
};

export default editTaskPage;
