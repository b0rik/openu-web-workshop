import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import { CircleUserRound, Bed, Bone, Circle } from 'lucide-react';

const mockTaskData = {
  patient: {
    socialId: '123456789',
    name: 'sick person',
    department: 'medical',
    room: '420',
    bed: '2',
    age: 80,
  },
  type: 'imaging',
  subTypes: ['PATCT', 'MRI', 'CT'],
  status: 'pending',
  createdAt: new Date(Date.now() - 1000000000),
  isUrgent: false,
};

const TaskIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'imaging':
      return <Bone size='32px' />;
    default:
      return null;
  }
};

export const TaskCard = () => {
  const {
    patient: {
      name: patientName,
      age: patientAge,
      socialId: patientSocialId,
      department,
      room,
      bed,
    },
    createdAt,
    isUrgent,
    status,
    subTypes,
    type,
  } = mockTaskData;

  const statusColors: {
    [status: string]: string;
  } = {
    ['pending']: '#00AEEF',
  };

  return (
    <Card className='w-80 sm:w-96'>
      <CardHeader
        className={cn(
          'relative flex flex-row items-center  justify-between rounded-t-lg border-b-4 p-3 text-white',
          isUrgent ? 'border-red-500 bg-red-700' : 'border-sky-500 bg-sky-700',
        )}
      >
        <div className='flex items-center gap-2'>
          <CircleUserRound size='52px' />
          <div className='max-w-40 space-y-2 text-wrap break-words sm:max-w-52'>
            <CardTitle>
              <span>{patientName}</span>
              {', '}
              <span>{patientAge}</span>
            </CardTitle>
            <CardDescription className='text-white'>
              <span>ID {patientSocialId}</span>
            </CardDescription>
          </div>
        </div>
        <div className='absolute -bottom-3 right-2 flex items-center gap-1 self-end'>
          <p className='text-xl'>{type}</p>
          <div
            className={cn(
              'rounded-full p-2',
              isUrgent ? 'bg-red-500' : 'bg-sky-500',
            )}
          >
            <TaskIcon type={type} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-4 text-sky-700'>
        <div className='flex gap-2'>
          {subTypes.map((subType, index) => (
            <div
              className='bg-sky-600/25 px-2 py-1 text-sm text-sky-700'
              key={index}
            >
              {subType}
            </div>
          ))}
        </div>
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
        <div className='flex items-center gap-1'>
          <p>{'status:'}</p>
          <Circle size='0.75rem' stroke='none' fill={statusColors[status]} />
          <p>{status}</p>
        </div>
        <p>
          Created at: <span>{createdAt.toLocaleString('en-GB')}</span>
        </p>
      </CardContent>
    </Card>
  );
};
