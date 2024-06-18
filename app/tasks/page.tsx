import { TaskList } from '@/components/taskList/TaskList'
import { getTasksWithPatient } from '@/data/tasks';


import React from 'react'

const page = async () => {
  const tasks = await getTasksWithPatient();

  return (
    <div className='flex justify-center'>
        <TaskList tasks={tasks} />
    </div>
  )
}


export default page;
