import { useFormState } from 'react-hook-form';

import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  const { isSubmitting } = useFormState();
  return (
    <Button
      type='submit'
      className='w-full rounded-full bg-sky-500 text-lg hover:bg-sky-600'
      disabled={isSubmitting}
    >
      {isSubmitting ? <LoaderCircle className='animate-spin' /> : children}
    </Button>
  );
};
