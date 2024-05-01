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

const mockPatientData = {
  id: '4f64c137-b56c-49dc-a115-491b9b880c3d',
  name: 'sick person',
  age: 80,
  socialId: '123456789', // social id
  department: 'medical',
  room: '420',
  bed: '2',
  addmissionDate: new Date(Date.now() - 1000000000),
};

const mockPatientTasks = [
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: true },
  { urgent: false },
];

export const PatientCard = () => {
  // get as prop
  const { name, age, socialId, bed, department, room, addmissionDate } =
    mockPatientData;
  // get for every user? seems wasteful fetches how to improve?
  const tasks = mockPatientTasks;

  const hospitalizationDays = (date: Date) => {
    // milliseconds * seconds * minutes * hours
    const millisInDay = 1000 * 60 * 60 * 24;
    const millisFromDate = Date.now() - date.getTime();

    return Math.round(millisFromDate / millisInDay);
  };

  const isUrgent = tasks.find((task) => task.urgent);

  return (
    <Card className='w-80 sm:w-96'>
      <CardHeader
        className={cn(
          'relative flex flex-row items-center justify-between rounded-t-lg border-b-4 p-3 text-white',
          isUrgent ? 'border-red-500 bg-red-700' : 'border-sky-500 bg-sky-700',
        )}
      >
        <div className='flex items-center gap-2'>
          <UserRound size='52px' />
          <div className='max-w-40 space-y-2 text-wrap break-words sm:max-w-52'>
            <CardTitle className=''>
              <span>{name}</span>
              {', '}
              <span>{age}</span>
            </CardTitle>
            <CardDescription className='text-white'>
              <span>ID {socialId}</span>
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
        <div className='flex gap-2'>
          <Bed />
          <p>{department}</p>
          <Separator orientation='vertical' className='h-auto' />
          <p>Room {room}</p>

          {bed && (
            <>
              <Separator orientation='vertical' className='h-auto' />
              <p>Bed {bed}</p>
            </>
          )}
        </div>
        <div className='flex flex-col justify-between sm:flex-row'>
          <div className='flex items-center gap-2'>
            <Calendar className='self-start' />
            <p>{`${hospitalizationDays(addmissionDate)} Days of hospitalization`}</p>
          </div>
          <Button
            variant='ghost'
            className='flex items-center gap-1 self-end text-lg'
          >
            <span>
              <Plus />
            </span>
            Add task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
