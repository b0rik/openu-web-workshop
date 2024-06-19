'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CircleUserRound,
  SquareCheck,
  TestTubeDiagonal,
  Camera,
  Pencil,
} from 'lucide-react';
import type { TaskWithPatientType } from '@/data/tasks';
import { updateStatus } from '@/actions/tasks';
import Link from 'next/link';
import { useState } from 'react';

type TaskStatusType = 'Pending' | 'In progress' | 'Complete';

const getStatusStyle = (status: TaskStatusType): string => {
  switch (status) {
    case 'Pending':
      return 'bg-purple-100 text-purple-700 border border-purple-300';
    case 'In progress':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    case 'Complete':
      return 'bg-green-100 text-green-700 border border-green-300';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-300';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Laboratory':
      return <TestTubeDiagonal />;
    case 'Imaging':
      return <Camera />;
    default:
      return <SquareCheck />;
  }
};

export const TaskCard = ({ task }: { task: TaskWithPatientType }) => {
  const [checked, setChecked] = useState(
    task.taskDetails.status === 'Complete'
  );
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return date;
  };

  const onCheckboxChecked = async () => {
    // TODO: handle error
    setChecked(true);
    await updateStatus(task.taskDetails.id, 'Complete');
  };

  return (
    <AccordionItem
      value={task.taskDetails.id}
      className='relative mb-8 grow overflow-visible rounded-lg border-4 border-blue-600 shadow-lg'
    >
      <div className='text-bg absolute -top-6 ml-2 flex font-bold'>
        <div className='left-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white'>
          {getCategoryIcon(task.taskDetails.categoryName)}
        </div>
        <div className='ml-1'>{task.taskDetails.categoryName}</div>
      </div>

      <div className='flex items-start justify-between rounded-t-lg bg-white p-4 sm:flex-row sm:items-center'>
        {/* Flex container for items on the left */}
        <div className='flex w-full flex-wrap items-start text-xs sm:w-auto sm:items-center'>
          <div className='flex items-start gap-2 sm:items-center'>
            <Checkbox
              id={`checkbox-${task.taskDetails.id}`}
              onClick={onCheckboxChecked}
              checked={checked}
              disabled={checked}
            />
            <div>
              <label
                htmlFor={`checkbox-${task.taskDetails.id}`}
                className='text-xs font-medium'
              >
                {task.taskDetails.subCategoryName}
              </label>
              <p>{task.patient.firstName + ' ' + task.patient.lastName}</p>
              <p>ID: {task.patient.id}</p>
            </div>
          </div>
        </div>
        {/* Urgent indicator and AccordionTrigger */}
        <div className='ml-auto mt-2 items-center text-xs font-bold sm:mt-0'>
          {task.taskDetails.isUrgent && (
            <div className='flex items-center'>
              <span className='text-black-700 inline-block rounded-full border border-red-600 bg-red-600 px-2 py-1 text-xs font-semibold'>
                URGENT
              </span>
            </div>
          )}
          <div>
            <AccordionTrigger className='ml-4 items-start'>
              <span className='text-black'>Details</span>
            </AccordionTrigger>
          </div>
        </div>
      </div>
      <AccordionContent className='rounded-b-lg border-t border-blue-600 bg-gray-50 p-4'>
        <div className='flex flex-col gap-1'>
          {task.taskDetails.assignedToUser && (
            <div className='flex flex-wrap text-gray-700'>
              <span>User: {task.taskDetails.assignedToUser.split('@')[0]}</span>
              <span>{`@${task.taskDetails.assignedToUser.split('@')[1]}`}</span>
            </div>
          )}
          <div className='flex items-center gap-1 text-gray-700'>
            Status:
            <span
              className={`rounded-full px-2 py-1 text-sm font-semibold ${getStatusStyle(task.taskDetails.status as TaskStatusType)}`}
            >
              {task.taskDetails.status}
            </span>
          </div>
          <div className='text-gray-700'>
            Due Date: {formatDate(task.taskDetails.dueDate)}
          </div>
          <div className='mt-4'>
            {task.taskDetails.comments && (
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Comments:
                </label>
                <p className='w-full rounded-md border bg-gray-100 p-2'>
                  {task.taskDetails.comments}
                </p>
              </div>
            )}
          </div>
          <Link
            className='self-end p-2'
            href={`/tasks/${task.taskDetails.id}/edit`}
          >
            <Pencil />
          </Link>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
