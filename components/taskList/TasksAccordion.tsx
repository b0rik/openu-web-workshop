'use client';

import { useEffect, useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { TaskCard } from '@/components/TaskCard';
import { TaskWithPatientType } from '@/data/tasks';

const useSortedTasks = (tasks: TaskWithPatientType[]) => {
  const [sortedTaskList, setSortedTaskList] = useState<TaskWithPatientType[]>(
    []
  );

  const compareStatus = (a: TaskWithPatientType, b: TaskWithPatientType) => {
    if (
      a.taskDetails.status === 'Complete' &&
      b.taskDetails.status === 'Complete'
    ) {
      return 0;
    }

    if (a.taskDetails.status === 'Complete') {
      return 1;
    }

    return -1;
  };

  useEffect(() => {
    setSortedTaskList(tasks.toSorted(compareStatus));
  }, [tasks]);

  return sortedTaskList;
};

export const TasksAccordion = ({ tasks }: { tasks: TaskWithPatientType[] }) => {
  const sortedTaskList = useSortedTasks(tasks);

  return (
    <Accordion type='multiple'>
      {sortedTaskList.map((task) => {
        return <TaskCard key={task.taskDetails.id} task={task} />;
      })}
    </Accordion>
  );
};
