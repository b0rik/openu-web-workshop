'use client'

import React, { useState, useEffect } from 'react';
import { getTasksWithPatient } from '@/data/tasks';
import { TaskCard } from '@/components/TaskCard';
import { Accordion } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Filter from '../filter-bar/Filter';
import { tasksTable } from '@/models/drizzle/tasksSchema';
import { patientsTable } from '@/models/drizzle/patientsSchema';

const filters = {
  category: [
    { value: 'imaging', label: 'Imaging', checked: false },
    { value: 'laboratory', label: 'Laboratory', checked: false },
    { value: 'consult', label: 'Consult', checked: false },
    { value: 'letters', label: 'Letters', checked: false },
    { value: 'discharge', label: 'Discharge', checked: false },
  ],
  subCategory: [
    {
      category: 'imaging',
      subCategory: [
        { value: 'us', label: 'US', checked: false },
        { value: 'xray', label: 'X-Ray', checked: false },
      ],
    },
    { category: 'consult', subCategory: [] },
    {
      category: 'laboratory',
      subCategory: [
        { value: 'hematology', label: 'Hematology', checked: false },
        {
          value: 'completeBloodCount',
          label: 'Complete Blood Count',
          checked: false,
        },
      ],
    },
    {
      category: 'letters',
      subCategory: [],
    },
    { category: 'discharge', subCategory: [] },
  ],
  urgency: [
    { value: 'urgant', label: 'Urgent', checked: false },
    { value: 'notUrgent', label: 'Not Urgent', checked: false },
  ],
  status: [
    { value: 'pending', label: 'Pending', checked: false },
    { value: 'inProgress', label: 'In progress', checked: false },
    { value: 'complete', label: 'Complete', checked: false },
  ],
};

type TasksType = {
  taskDetails: typeof tasksTable.$inferSelect;
  patient: typeof patientsTable.$inferSelect;
}[];

type TasksListPropsType = {
  tasks: TasksType;
};

export const TaskList = ({ tasks }: TasksListPropsType) => {
  // const tasks = await getTasksWithPatient();
  //use map and map every record to component of TaskCard
  const [tasksList, setTasksList] = useState(tasks);
  const [filterList, setFilterList] = useState(filters);

  useEffect(() => {
    
  }, [filterList]);

  return (
    <Card className='w-full max-w-screen-lg p-6'>
      <Filter filterList={filterList} setFilterList={setFilterList} />
      <Accordion type='multiple' className=''>
        {tasks.map((task) => {
          return <TaskCard key={task.taskDetails.id} task={task} />;
        })}
      </Accordion>
    </Card>
  );
};