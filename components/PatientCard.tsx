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
  name: 'איש סובל',
  age: 80,
  socialId: '123456789', // social id
  department: 'גריאטריה',
  room: '420',
  bed: 2,
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
  // get as prop?
  const { name, age, socialId, bed, department, room, addmissionDate } =
    mockPatientData;
  // fetch for every user? wasteful fetches how to improve?
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
          'flex flex-row justify-between items-center text-white rounded-t-lg p-3',
          isUrgent ? 'bg-[#B40000]' : 'bg-[#096F9F]'
        )}
      >
        <div className='flex items-center gap-2'>
          <UserRound size='52px' />
          <div className='space-y-2'>
            <CardTitle>
              <span>{name}</span>
              {', '}
              <span>{age}</span>
            </CardTitle>
            <CardDescription className='text-white'>
              <span>ת.ז. {socialId}</span>
            </CardDescription>
          </div>
        </div>
        {isUrgent && (
          <div className='self-start'>
            <div className='flex gap-1'>
              <Bell />
              <p>דחוף</p>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className='p-4 space-y-4 text-[#1e7489]'>
        <p>{`${tasks.length ? tasks.length : 'אין'} משימות`}</p>
        <div className='flex gap-2'>
          <Bed />
          <p>{department}</p>
          <Separator orientation='vertical' className='h-auto' />
          <p>חדר {room}</p>

          {bed && (
            <>
              <Separator orientation='vertical' className='h-auto' />
              <p>מיטה {bed}</p>
            </>
          )}
        </div>
        <div className='flex flex-col sm:flex-row justify-between'>
          <div className='flex gap-2 items-center'>
            <Calendar />
            <p>{`${hospitalizationDays(addmissionDate)} ימי אשפוז`}</p>
          </div>
          <Button
            variant='ghost'
            className='flex self-end items-center gap-1 text-lg'
          >
            <span>
              <Plus />
            </span>
            הוסף משימה
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
