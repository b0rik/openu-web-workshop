'use client';

import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';
import { taskStatusTable } from '@/models/drizzle/taskStatusSchema';
import { usersTable } from '@/models/drizzle/usersSchema';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CircleUserRound } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { PencilLine, Dot } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useSearchParams } from 'next/navigation';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { differenceInYears } from 'date-fns';
import { Icon, iconNameType } from '@/components/Icon';

const age = (date: Date): number => differenceInYears(new Date(), date);

type createTaskType = {
  taskCategories: (typeof taskCategoriesTable.$inferSelect)[];
  taskStatuses: (typeof taskStatusTable.$inferSelect)[];
  users: Omit<typeof usersTable.$inferSelect, 'hashedPassword'>[];
};

export const CreateTask = ({
  taskCategories,
  taskStatuses,
  users,
}: createTaskType) => {
  const [date, setDate] = React.useState<Date>();
  const [isSelectTime, setIsSelectTime] = React.useState(false);
  const [isUrgent, setIsUrgent] = React.useState(false);
  const [taskCategory, setTaskCategory] = React.useState<string | undefined>();
  const [taskComment, setTaskComment] = React.useState('');
  const [taskStatus, setTaskStatus] = React.useState<string>('');
  const searchParams = useSearchParams();
  const patientJson = searchParams.get('patient');
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    unitName,
    roomNumber,
    admissionTime,
  }: typeof patientsTable.$inferSelect = JSON.parse(patientJson!);
  const [taskCategoriesWithIcon, setTaskCategoriesWithIcon] = React.useState<
    { name: string; icon: React.ReactNode }[]
  >([]);

  React.useEffect(() => {
    setTaskCategoriesWithIcon(
      taskCategories.map(({ name, iconName }) => ({
        name,
        icon: <Icon name={iconName as iconNameType} />,
      }))
    );
  }, [taskCategories]);
  // const taskCategories = [
  //   {id: 'Ultrasound', name: <span>Ultrasound</span>, logo: <Skull/>},
  //   {id: 'Lab', name: <span>Lab</span>, logo: <TestTube2/>},
  //   {id: 'Imaging', name: <span>Imaging</span>, logo: <Camera/>},
  //   {id: 'Medicines', name: <span>Medicines</span>, logo: <Pill/>},
  //   {id: 'Monitoring', name: <span>Monitoring</span>, logo: <Activity/>},
  //   {id: 'Shots', name: <span>Shots</span>, logo: <Syringe/>},
  // ];

  return (
    <Card className='w-1f20 sm:w-100'>
      <CardHeader
        className={cn(
          'relative flex flex-row items-center  justify-between rounded-t-lg border-b-4 p-3 text-white',
          'border-sky-500 bg-sky-700'
        )}
      >
        <div className='flex items-center gap-2'>
          <CircleUserRound size='52px' />
          <div className='sm:max-w-100'>
            <CardTitle>
              <span>
                {firstName + ' ' + lastName + ', ' + age(dateOfBirth)}
              </span>
            </CardTitle>
            <CardDescription className='text-white'>
              <span>ID {id}</span>
            </CardDescription>
          </div>
        </div>
        <div className='flex flex-col'>
          <p>{unitName}</p>
          <Separator orientation='vertical' className='h-auto' />
          {roomNumber && <p>Room: {roomNumber}</p>}
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-4 text-sky-700'>
        <span>Category</span>
        <div className='grid grid-cols-2 gap-2 min-[425px]:grid-cols-3 md:grid-cols-6'>
          {taskCategoriesWithIcon.map(({ name, icon }) => (
            <div
              key={name + id}
              id={name + id}
              className={cn(
                'flex cursor-pointer flex-col items-center rounded-lg border-4 border-transparent p-2',
                taskCategory === name ? 'border-gray-100' : ''
              )}
              onClick={() => setTaskCategory(name)}
            >
              {icon}
              {name}
            </div>
          ))}
        </div>

        <div>
          <span>Comment</span>
          <Textarea
            id='comments-text-area'
            placeholder='Type your message here.'
            onChange={(event) => {
              setTaskComment(event.target.value);
            }}
          />
        </div>

        <div className='flex items-center gap-3'>
          <Select
            value={taskStatus}
            onValueChange={(value) => setTaskStatus(value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value='Pending'>Pending</SelectItem>
              <SelectItem value='Done'>Done</SelectItem> */}
              {taskStatuses.map((status, i) => (
                <SelectItem key={status.name + i} value={status.name}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Assigned To</span>
          <div className='flex items-center gap-3'>
            <PencilLine />
            <Select key='assigned-to-select'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select user to assign' />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value='Doctor 1'>Doctor 1</SelectItem>
                <SelectItem value='Doctor 2'>Doctor 2</SelectItem> */}
                {users.map((user, i) => {
                  const name = `${user.firstName} ${user.lastName}`;

                  return (
                    <SelectItem key={user.username} value={user.username}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex gap-3'>
          <span>Due at:</span>
          <RadioGroup defaultValue='option-one' className='flex'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                value='option-one'
                id='option-one'
                onClick={() => setIsSelectTime(false)}
              />
              <Label htmlFor='option-one'>Now</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                value='option-two'
                id='option-two'
                onClick={() => setIsSelectTime(true)}
              />
              <Label htmlFor='option-two'>Select Time</Label>
            </div>
          </RadioGroup>
        </div>

        {isSelectTime && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        <div className='flex items-center gap-3'>
          <span>Urgent</span>
          <Switch onCheckedChange={() => setIsUrgent(!isUrgent)} />
        </div>

        <Button className='w-full rounded-full'>Save Task</Button>
      </CardContent>
    </Card>
  );
};
