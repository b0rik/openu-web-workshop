'use client';

import { editComment } from '@/actions/tasks';
import { TaskWithPatientType } from '@/data/tasks';
import { set } from 'date-fns';
import { Pencil } from 'lucide-react';
import { useRef, useState } from 'react';

export const TaskCardComment = ({ task }: { task: TaskWithPatientType }) => {
  const [value, setValue] = useState(task.taskDetails.comments || '');
  const [showInput, setShowInput] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        setShowInput(false);
        await editComment(
          task.taskDetails.id,
          formData.get('task-comment')?.toString()
        );
      }}
    >
      {!showInput && (
        <p
          className='cursor-pointer px-1'
          onClick={() => {
            setShowInput(true);
          }}
        >
          {value}
        </p>
      )}
      {showInput && (
        <div className='relative flex justify-between'>
          <input
            type='text'
            value={value}
            name='task-comment'
            className='w-full rounded p-0 px-1'
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button className='absolute right-2 flex items-center gap-1'>
            <Pencil size='16px' />
            <b>Save</b>
          </button>
        </div>
      )}
    </form>
  );
};
