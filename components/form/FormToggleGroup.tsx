'use client';

import { useFormContext } from 'react-hook-form';
import { useId } from 'react';

import { cn } from '@/lib/utils';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ErrorMessage } from '@hookform/error-message';

type FormToggleGroupType = {
  name: string;
  label: string;
  items: {
    item: React.ReactNode;
    value: string;
  }[];
  multiple?: boolean;
  onChange?: () => void;
  outline?: boolean;
};

export const FormToggleGroup = ({
  name,
  label,
  items,
  onChange,
  multiple = false,
  outline = false,
}: FormToggleGroupType) => {
  const form = useFormContext();
  const errorIdPrefix = useId();
  const itemIdPrefix = useId();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <ToggleGroup
                className='grid grid-cols-2 gap-2 min-[425px]:grid-cols-3 md:grid-cols-6'
                type={multiple ? 'multiple' : 'single'}
                onValueChange={(value: any) => {
                  field.onChange(value);
                  onChange && onChange();
                }}
                defaultValue={field.value}
                value={field.value}
              >
                {items.map((item, index) => (
                  <ToggleGroupItem
                    className='h-auto p-2'
                    key={itemIdPrefix + index}
                    value={item.value}
                  >
                    {item.item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
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
