import { ControllerRenderProps, useFormState } from 'react-hook-form';
import { useId, useState } from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@hookform/error-message';

import { CalendarIcon } from 'lucide-react';

interface FormDatePickerProps {
  field: ControllerRenderProps<any, any>;
}

export const FormDatePicker = ({ field }: FormDatePickerProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { isDirty, invalid, name } = useFormField();
  const { errors } = useFormState(field);
  const errorIdPrefix = useId();
  return (
    <div>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'rounded-full border-sky-300 focus-visible:ring-sky-600',
              (isDirty || invalid) &&
                (invalid ? 'border-red-400' : 'border-green-400')
            )}
          >
            {field.value ? (
              format(field.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            showOutsideDays={false}
            mode='single'
            selected={field.value}
            onSelect={(date) => {
              setCalendarOpen(false);
              date?.setDate(date.getDate() + 1); //date is offsetted by one because on time zone diff
              field.onChange(date?.toISOString().split('T')[0]);
            }}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
            captionLayout='dropdown-buttons'
            fromYear={1900}
            toYear={2024}
            classNames={{
              caption_label: 'hidden',
              vhidden: 'hidden',
              dropdown_month: 'border',
              dropdown_year: 'border',
              caption_dropdowns: 'flex gap-2',
            }}
          />
        </PopoverContent>
      </Popover>
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
