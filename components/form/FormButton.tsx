import { Button } from '@/components/ui/button';

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      type='submit'
      className='w-full rounded-full bg-sky-500 text-lg hover:bg-sky-600'
    >
      {children}
    </Button>
  );
};
