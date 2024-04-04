import { CiCircleCheck } from 'react-icons/ci';
import { CiCircleRemove } from 'react-icons/ci';

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
      <CiCircleCheck className='w-6 h-6 absolute left-2 text-[#99ce97]' />
    ) : (
      <CiCircleRemove className='w-6 h-6 absolute left-2 text-[#fc8585]' />
    ))
  );
};
