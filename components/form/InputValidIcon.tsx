import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';

type InputValidIconProps = {
  show?: boolean;
  isValid?: boolean;
};

export const InputValidIcon = ({
  show = false,
  isValid = false,
}: InputValidIconProps) => {
  return (
    show &&
    (isValid ? (
      <CircleCheck
        strokeWidth={1}
        className='absolute right-2 h-6 w-6 text-green-400'
      />
    ) : (
      <CircleX
        strokeWidth={1}
        className='absolute right-2 h-6 w-6 text-red-400'
      />
    ))
  );
};
