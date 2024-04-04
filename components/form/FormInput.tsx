import { ControllerRenderProps } from 'react-hook-form';

import { Input } from '../ui/input';
import { InputValidIcon } from './InputValidIcon';

interface FormInputProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  showValidIcon?: boolean;
  isValid?: boolean;
}

export const FormInput = ({
  field,
  placeholder = '',
  type = 'text',
  showValidIcon = false,
  isValid = false,
}: FormInputProps) => {
  return (
    <div className='flex items-center relative'>
      <Input
        className='border-[#88ced8] focus-visible:ring-[#1e7489] rounded-full'
        placeholder={placeholder}
        type={type}
        {...field}
      />
      <InputValidIcon show={showValidIcon} isValid={isValid} />
    </div>
  );
};
