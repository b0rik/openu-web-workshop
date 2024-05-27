import React from 'react';
import { getTasksWithPatient } from '@/data/tasks';
import { TaskCard } from '@/components/TaskCard';

export const TaskList = async () => {
  const tasks = await getTasksWithPatient();
  //use map and map every record to component of TaskCard

  return (
    <div className='space-y-4'>
      {tasks.map((task) => {
        return <TaskCard key={task.tasks.id} task={task} />;
      })}
    </div>
  );
};
