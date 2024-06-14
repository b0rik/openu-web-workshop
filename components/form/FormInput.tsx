'use client';

import { useId } from 'react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { InputValidIcon } from '@/components/form/InputValidIcon';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
};

export const FormInput = ({
  name,
  label,
  placeholder = '',
  type = 'text',
}: FormInputProps) => {
  const form = useFormContext();
  const errorIdPrefix = useId();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <div className='relative flex items-center'>
                <Input
                  className={cn(
                    'rounded-full border-sky-300 focus-visible:ring-sky-600',
                    (fieldState.isDirty || fieldState.invalid) &&
                      (fieldState.invalid
                        ? 'border-red-400'
                        : 'border-green-400')
                  )}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                />
                <InputValidIcon
                  show={fieldState.isDirty || fieldState.invalid}
                  isValid={!fieldState.invalid}
                />
              </div>
              <ErrorMessage
                errors={form.formState.errors}
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
          </FormControl>
        </FormItem>
      )}
    />
  );
};
