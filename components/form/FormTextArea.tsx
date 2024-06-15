'use client';

import { useId } from 'react';

import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

type FormTextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export const FormTextArea = ({
  name,
  label,
  placeholder = '',
}: FormTextAreaProps) => {
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
                <Textarea placeholder={placeholder} {...field} />
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
