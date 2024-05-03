'use client';

import { ControllerRenderProps, useFormState } from 'react-hook-form';
import { useId } from 'react';

import { cn } from '@/lib/utils';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useFormField } from '../ui/form';
import { ErrorMessage } from '@hookform/error-message';

interface FormSelectProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  roles?: string[];
}

export const FormSelect = ({
  field,
  placeholder = '',
  roles = [],
}: FormSelectProps) => {
  const { invalid, name, isDirty } = useFormField();
  const { errors } = useFormState(field);
  const errorIdPrefix = useId();
  const roleIdPrefix = useId();

  return (
    <div>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger
          className={cn(
            'rounded-full border-sky-300 focus:ring-sky-600',
            (isDirty || invalid) &&
              (invalid ? 'border-red-400' : 'border-green-400'),
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role, index) => {
            return (
              <SelectItem key={roleIdPrefix + index} value={role}>
                {role}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
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
