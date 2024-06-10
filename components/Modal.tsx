'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/components/ui/dialog';

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className='max-w-md p-0 md:max-w-3xl'>
        {children}
      </DialogContent>
    </Dialog>
  );
};
