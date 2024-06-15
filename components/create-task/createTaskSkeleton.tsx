'use client';

import { useSearchParams } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInYears, set } from 'date-fns';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { patientsTable } from '@/models/drizzle/patientsSchema';

const age = (date: Date): number => differenceInYears(new Date(), date);

export const CreateTaskSkeleton = () => {
  const searchParams = useSearchParams();
  const patientJson = searchParams.get('patient');
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    unitName,
    roomNumber,
  }: typeof patientsTable.$inferSelect = JSON.parse(patientJson!);

  return (
    <Card className='w-1f20 sm:w-100'>
      <CardHeader
        className={cn(
          'relative flex flex-row items-center  justify-between rounded-t-lg border-b-4 p-3 text-white',
          'border-sky-500 bg-sky-700'
        )}
      >
        <div className='flex items-center gap-2'>
          <CircleUserRound size='52px' />
          <div className='sm:max-w-100'>
            <CardTitle>
              <span>
                {firstName + ' ' + lastName + ', ' + age(dateOfBirth)}
              </span>
            </CardTitle>
            <CardDescription className='text-white'>
              <span>ID {id}</span>
            </CardDescription>
          </div>
        </div>
        <div className='flex flex-col'>
          <p>{unitName}</p>
          {roomNumber && <p>Room: {roomNumber}</p>}
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-4 text-sky-700'>
        <div className='space-y-2'>
          <Skeleton className='h-[17px] w-[60px]' />
          <div className='grid grid-cols-2 gap-2 min-[425px]:grid-cols-3 md:grid-cols-6'>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className='h-[60px]' />
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-[17px] w-[90px]' />
          <Skeleton className='h-[40px] w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-[17px] w-[65px]' />
          <Skeleton className='h-[80px] w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-[17px] w-[43px]' />
          <Skeleton className='h-[40px] w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-[17px] w-[80px]' />
          <Skeleton className='h-[40px] w-full' />
        </div>

        <Skeleton className='h-[24px] w-[220px]' />

        <Skeleton className='h-[17px] w-[45px]' />
        <Skeleton className='h-[24px] w-[44px]' />

        <Skeleton className='h-[40px] w-full' />
      </CardContent>
    </Card>
  );
};
