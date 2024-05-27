import { Skeleton } from '@/components/ui/skeleton';

import { FormCardWrapper } from '@/components/form/FormCardWrapper';

export const PatientCreateFormSkeleton = () => {
  return (
    <FormCardWrapper title='Create a user'>
      <div className='space-y-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-[17px] w-[68px] bg-sky-700' />
              <Skeleton className='h-[40px] rounded-full bg-sky-700' />
            </div>
          ))}
        </div>
        <Skeleton className='h-[40px] rounded-full bg-sky-700' />
      </div>
    </FormCardWrapper>
  );
};
