'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Bed, Calendar, UserRound, Plus } from 'lucide-react';
import { differenceInYears, differenceInDays } from 'date-fns';
import { useState } from 'react';
import { patientsTable } from '@/models/drizzle/patientsSchema';

const mockPatientTasks = [
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: true },
  { urgent: false },
];

const hospitalizationDays = (date: Date): number =>
  differenceInDays(new Date(), date);
const age = (dateOfBirth: Date): number =>
  differenceInYears(new Date(), dateOfBirth);

export const PatientCard = ({
  patient,
}: {
  patient: typeof patientsTable.$inferSelect;
}) => {
  const { id, firstName, lastName, unitName, roomNumber } = patient;

  // get for every user? seems wasteful fetches how to improve?
  const tasks = mockPatientTasks;

  const isUrgent = tasks.some((task) => task.urgent);

  return (
    <Card className='w-80 sm:w-96'>
      <CardHeader
        className={cn(
          'relative flex flex-row items-center justify-between rounded-t-lg border-b-4 p-3 text-white',
          isUrgent ? 'border-red-500 bg-red-700' : 'border-sky-500 bg-sky-700'
        )}
      >
        <div className='flex items-center gap-2'>
          <UserRound size='52px' />
          <div className='max-w-40 space-y-2 text-wrap break-words sm:max-w-52'>
            <CardTitle className=''>
              <span>{firstName + ' ' + lastName}</span>
              {/* {', '}
              <span>{age(date_of_birth)}</span> */}
            </CardTitle>
            <CardDescription className='text-white'>
              <span>ID: {id}</span>
            </CardDescription>
          </div>
        </div>
        {isUrgent && (
          <div className='absolute right-3 top-1'>
            <div className='flex gap-1'>
              <Bell />
              <p>Urgent</p>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className='space-y-4 p-4 text-sky-700'>
        <p>{`${tasks.length ? tasks.length : 'no'} tasks`}</p>
        <div className='flex  gap-2'>
          <p>{unitName}</p>
          <Separator orientation='vertical' className='h-auto' />
          {roomNumber && (
            <>
              <Bed />
              <p>{roomNumber}</p>
            </>
          )}
        </div>
        <div className='flex items-center justify-end'>
          {/* <div className='flex items-center gap-2'>
            <Calendar className='self-start' />
            <p>{`${hospitalizationDays(admissionDate)} Days of hospitalization`}</p>
          </div> */}
          <Button
            variant='ghost'
            className='flex items-center gap-1 self-end text-lg'
          >
            <span>
              <Plus />
            </span>
            New Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
