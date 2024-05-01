import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';

interface InputValidIconProps {
  show?: boolean;
  isValid?: boolean;
}

export const InputValidIcon = ({
  show = false,
  isValid = false,
}: InputValidIconProps) => {
  return (
    show &&
    (isValid ? (
      <CircleCheck
        strokeWidth={1}
        className='absolute right-2 h-6 w-6 text-[#99ce97]'
      />
    ) : (
      <CircleX
        strokeWidth={1}
        className='absolute right-2 h-6 w-6 text-[#fc8585]'
      />
    ))
  );
};
