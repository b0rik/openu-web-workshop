'use client';

import { ControllerRenderProps, useFormState } from 'react-hook-form';
import { useId } from 'react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { InputValidIcon } from '@/components/form/InputValidIcon';
import { useFormField } from '@/components/ui/form';
import { ErrorMessage } from '@hookform/error-message';

type FormInputProps = {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
};

export const FormInput = ({
  field,
  placeholder = '',
  type = 'text',
}: FormInputProps) => {
  const { isDirty, invalid, name } = useFormField();
  const { errors } = useFormState(field);
  const errorIdPrefix = useId();

  return (
    <div>
      <div className='relative flex items-center'>
        <Input
          className={cn(
            'rounded-full border-sky-300 focus-visible:ring-sky-600',
            (isDirty || invalid) &&
              (invalid ? 'border-red-400' : 'border-green-400')
          )}
          placeholder={placeholder}
          type={type}
          {...field}
        />
        <InputValidIcon show={isDirty || invalid} isValid={!invalid} />
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages && (
            <ul className='mt-2'>
              {Object.values(messages)
                .flat()
                .map((error, index) => (
                  <li
                    className='text-sm font-medium text-destructive'
                    key={errorIdPrefix + index}
                  >
                    {error}
                  </li>
                ))}
            </ul>
          )
        }
      />
    </div>
  );
};
