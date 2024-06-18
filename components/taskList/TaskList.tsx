'use client';

import React, { useState, useEffect } from 'react';
import { getTasksWithPatient } from '@/data/tasks';
import { TaskCard } from '@/components/TaskCard';
import { Accordion } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Filter from '../filter-bar/Filter';
import { tasksTable } from '@/models/drizzle/tasksSchema';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { TaskWithPatientType } from '@/data/tasks';
import { TasksAccordion } from '@/components/taskList/TasksAccordion';

const filters = {
  category: [
    { value: 'consult', label: 'Consult', checked: false },
    { value: 'discharge', label: 'Discharge', checked: false },
    { value: 'imaging', label: 'Imaging', checked: false },
    { value: 'laboratory', label: 'Laboratory', checked: false },
    { value: 'letters', label: 'Letters', checked: false },
  ],
  subCategory: [
    {
      category: 'imaging',
      subCategory: [
        { value: 'us', label: 'US', checked: false },
        { value: 'x-ray', label: 'X-Ray', checked: false },
      ],
    },
    { category: 'consult', subCategory: [] },
    {
      category: 'laboratory',
      subCategory: [
        {
          value: 'complete blood count',
          label: 'Complete Blood Count',
          checked: false,
        },
        { value: 'hematology', label: 'Hematology', checked: false },
      ],
    },
    {
      category: 'letters',
      subCategory: [],
    },
    { category: 'discharge', subCategory: [] },
  ],
  urgency: [
    { value: 'notUrgent', label: 'Not Urgent', checked: false },
    { value: 'urgent', label: 'Urgent', checked: false },
  ],
  status: [
    { value: 'complete', label: 'Complete', checked: false },
    { value: 'in progress', label: 'In progress', checked: false },
    { value: 'pending', label: 'Pending', checked: false },
  ],
};

export const TaskList = ({ tasks }: { tasks: TaskWithPatientType[] }) => {
  const [tasksList, setTasksList] = useState(tasks);
  const [filterList, setFilterList] = useState(filters);

  useEffect(() => {
    // Filter tasks based on the filterList
    const filteredTasks = tasks.filter((task) => {
      // Category filter
      const categoryMatch = filterList.category.some(
        (cat) =>
          cat.checked &&
          cat.value === task.taskDetails.categoryName.toLowerCase()
      );

      // Subcategory filter
      const subCategoryMatch = filterList.subCategory.some(
        (subCat) =>
          subCat.category === task.taskDetails.categoryName.toLowerCase() &&
          subCat.subCategory.some(
            (sub) =>
              sub.checked &&
              sub.value === task.taskDetails.subCategoryName.toLowerCase()
          )
      );

      // Urgency filter
      const urgencyMatch = filterList.urgency.some(
        (urgency) =>
          urgency.checked &&
          ((urgency.value === 'urgent' && task.taskDetails.isUrgent) ||
            (urgency.value === 'notUrgent' && !task.taskDetails.isUrgent))
      );

      // Status filter
      const statusMatch = filterList.status.some(
        (status) =>
          status.checked &&
          status.value.toLowerCase() === task.taskDetails.status.toLowerCase()
      );

      // Combine filters
      return (
        (categoryMatch || !filterList.category.some((cat) => cat.checked)) &&
        (subCategoryMatch ||
          !filterList.subCategory.some((subCat) =>
            subCat.subCategory.some((sub) => sub.checked)
          )) &&
        (urgencyMatch ||
          !filterList.urgency.some((urgency) => urgency.checked)) &&
        (statusMatch || !filterList.status.some((status) => status.checked))
      );
    });

    setTasksList(filteredTasks);
  }, [filterList, tasks]);

  return (
    <Card className='mx-auto w-full max-w-screen-lg bg-white p-6'>
      <Filter filterList={filterList} setFilterList={setFilterList} />
      <TasksAccordion tasks={tasksList} />
    </Card>
  );
};
