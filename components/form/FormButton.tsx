import { Button } from '@/components/ui/button';

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      type='submit'
      className='w-full rounded-full text-lg bg-[#17a1bb] hover:bg-[#1e7489]'
    >
      {children}
    </Button>
  );
};
