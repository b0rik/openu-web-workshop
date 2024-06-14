'use client';

import { useFormContext } from 'react-hook-form';
import { useId } from 'react';

import { cn } from '@/lib/utils';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ErrorMessage } from '@hookform/error-message';

type FormSelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
};

export const FormSelect = ({
  name,
  label,
  placeholder = '',
  options = [],
}: FormSelectProps) => {
  const form = useFormContext();
  const errorIdPrefix = useId();
  const optionIdPrefix = useId();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger
                  className={cn(
                    'rounded-full border-sky-300 focus:ring-sky-600',
                    (fieldState.isDirty || fieldState.invalid) &&
                      (fieldState.invalid
                        ? 'border-red-400'
                        : 'border-green-400')
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option, index) => {
                    return (
                      <SelectItem key={optionIdPrefix + index} value={option}>
                        {option}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
