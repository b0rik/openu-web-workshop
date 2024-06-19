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
import { Bell, Bed, Calendar, UserRound, Plus, UserRoundX } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import Link from 'next/link';
import { tasksTable } from '@/models/drizzle/tasksSchema';
import { useSession } from 'next-auth/react';
import { ConfirmDialog } from './ConfirmDialog';
import { removePatient } from '@/actions/patients';

const hospitalizationDays = (date: Date): number =>
  differenceInDays(new Date(), date);

export const PatientCard = ({
  data,
}: {
  data: {
    patient: typeof patientsTable.$inferSelect;
    tasks: (typeof tasksTable.$inferSelect)[];
  };
}) => {
  const session = useSession();

  const { id, firstName, lastName, unitName, roomNumber, admissionTime } =
    data.patient;

  const isUrgent = data.tasks.some((task) => task.isUrgent);

  return (
    <Card>
      <CardHeader
        className={cn(
          'relative flex flex-row items-center justify-between rounded-t-lg border-b-4 p-3 text-white',
          isUrgent ? 'border-red-500 bg-red-700' : 'border-sky-500 bg-sky-700'
        )}
      >
        <div className='flex items-center gap-2'>
          <UserRound size='52px' />
          <div className='space-y-2 text-wrap break-words'>
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
      </CardHeader>
      <CardContent className='space-y-4 p-4 text-sky-700'>
        <div className='flex justify-between'>
          <p>{`${data.tasks.length ? data.tasks.length : 'no'} tasks`}</p>
          {isUrgent && (
            <div className='flex gap-1 text-red-700'>
              <Bell />
              <p>Urgent</p>
            </div>
          )}
        </div>
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
        <div>
          <p>
            hospitalized duration: {hospitalizationDays(admissionTime)} days
          </p>
        </div>
        <div className='flex flex-col justify-between gap-2 sm:flex-row'>
          {session?.data?.user?.canManageTasks && (
            <Button variant='ghost' className='justify-start px-2'>
              <Link
                href={{
                  pathname: '/tasks/create',
                  query: { patient: JSON.stringify(data.patient) },
                }}
                className='flex items-center gap-1 text-lg'
              >
                <Plus />
                <span>New Task</span>
              </Link>
            </Button>
          )}
          {session?.data?.user?.canManagePatients && (
            <ConfirmDialog
              trigger={
                <div className='flex items-center gap-1 px-2 text-lg hover:text-red-700'>
                  <UserRoundX />
                  <span>Delete</span>
                </div>
              }
              title='Are You sure you want to delete the patient?'
              description='This action cannot be undone. This will permanently delete the patient
            and remove his data from our servers including his tasks.'
              onAction={() => removePatient(id)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
