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
          'flex flex-row justify-between items-center  text-white rounded-t-lg p-3 border-b-4 relative',
          isUrgent
            ? 'bg-[#B40000] border-[#D43902]'
            : 'bg-[#096F9F] border-[#00AEEF]'
        )}
      >
        <div className='flex items-center gap-2'>
          <CircleUserRound size='52px' />
          <div className='space-y-2 max-w-40 sm:max-w-52 text-wrap break-words'>
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
        <div className='flex items-center self-end gap-1 absolute right-2 -bottom-3'>
          <p className='text-xl'>{type}</p>
          <div
            className={cn(
              'p-2 rounded-full',
              isUrgent ? 'bg-[#FE7725]' : 'bg-[#17A1BA]'
            )}
          >
            <TaskIcon type={type} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4 space-y-4 text-[#1e7489]'>
        <div className='flex gap-2'>
          {subTypes.map((subType, index) => (
            <div
              className='bg-[#1BA1A4]/25 text-[#1e7489] text-sm px-2 py-1'
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
        <div className='flex gap-1 items-center'>
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
