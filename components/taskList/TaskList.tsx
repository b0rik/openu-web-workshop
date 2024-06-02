import React from 'react';
import { getTasksWithPatient } from '@/data/tasks';
import { TaskCard } from '@/components/TaskCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

export const TaskList = async () => {
  const tasks = await getTasksWithPatient();
  //use map and map every record to component of TaskCard

  return (
    <Card className='max-w-screen-lg w-full p-6'>
      <Accordion type='multiple' className=''>
        {tasks.map((task) => {
          return <TaskCard key={task.taskDetails.id} task={task} />;
        })}
      </Accordion>
    </Card>
  );
};