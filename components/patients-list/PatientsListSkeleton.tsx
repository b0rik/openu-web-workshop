import { Skeleton } from '@/components/ui/skeleton';

import { ScrollArea } from '@/components/ui/scrollarea';

export const PatientsListSkeleton = () => {
  const dummies = Array(12).fill(0);
  return (
    <div className='rounded-xl bg-cyan-50 p-10'>
      <div className='flex justify-between'>
        <Skeleton className='h-[40px] w-[200px] bg-sky-700' />
        <Skeleton className='h-[40px] w-[86px] bg-sky-700' />
      </div>

      <div className='mb-5 mt-10 flex items-center'>
        <Skeleton className='h-[24px] w-[57px] bg-sky-700' />
        <Skeleton className='ml-8 h-[24px] w-[70px] bg-sky-700' />
      </div>

      <ScrollArea className='h-screen rounded-md'>
        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {dummies.map((_, i) => (
            <Skeleton key={i} className='h-[230px] w-80 bg-sky-700 sm:w-96' />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
