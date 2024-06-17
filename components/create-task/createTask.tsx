'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';
import { differenceInYears, set } from 'date-fns';
import { useRouter } from 'next/navigation';

import { taskCategoriesTable } from '@/models/drizzle/taskCategoriesSchema';
import { taskStatusTable } from '@/models/drizzle/taskStatusSchema';
import { usersTable } from '@/models/drizzle/usersSchema';
import { taskSubCategoriesTable } from '@/models/drizzle/taskSubCategoriesSchema';
import { cn } from '@/lib/utils';
import { createTask } from '@/actions/tasks';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { Icon, iconNameType } from '@/components/Icon';
import { Form } from '@/components/ui/form';
import { FormToggleGroup } from '@/components/form/FormToggleGroup';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormSelect } from '@/components/form/FormSelect';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSwitch } from '@/components/form/FormSwitch';
import { FormButton } from '@/components/form/FormButton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TaskCreateFormSchema } from '@/models/FormSchemas';
import { FormSuccess } from '@/components/form/FormSuccess';
import { FormError } from '@/components/form/FormError';

const age = (date: Date): number => differenceInYears(new Date(), date);

type createTaskType = {
  taskCategories: (typeof taskCategoriesTable.$inferSelect)[];
  taskStatuses: (typeof taskStatusTable.$inferSelect)[];
  users: Omit<typeof usersTable.$inferSelect, 'hashedPassword'>[];
  taskSubCategories: (typeof taskSubCategoriesTable.$inferSelect)[];
};

export const CreateTask = ({
  taskCategories,
  taskStatuses,
  users,
  taskSubCategories,
}: createTaskType) => {
  const form = useForm<z.infer<typeof TaskCreateFormSchema>>({
    resolver: zodResolver(TaskCreateFormSchema.omit({ patientId: true })),
    defaultValues: {
      assignedToUser: undefined,
      categoryName: '',
      comments: undefined,
      dueDate: undefined,
      isUrgent: false,
      status: '',
      subCategoryName: '',
      patientId: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [category, setCategory] = useState<string>('');
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [isSelectTime, setIsSelectTime] = useState(false);
  const searchParams = useSearchParams();
  const patientJson = searchParams.get('patient');
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    unitName,
    roomNumber,
  }: typeof patientsTable.$inferSelect = JSON.parse(patientJson!);
  const [taskCategoriesWithIcon, setTaskCategoriesWithIcon] = useState<
    { name: string; icon: React.ReactNode }[]
  >([]);

  useEffect(() => {
    setTaskCategoriesWithIcon(
      taskCategories.map(({ name, iconName }) => ({
        name,
        icon: <Icon name={iconName as iconNameType} />,
      }))
    );
  }, [taskCategories]);

  useEffect(() => {
    setSubCategories(
      taskSubCategories
        .filter(
          (subCategory) =>
            subCategory.categoryName === form.getValues().categoryName
        )
        .map(({ name }) => name)
    );
  }, [category, form, taskSubCategories]);

  const onSubmit = async (values: z.infer<typeof TaskCreateFormSchema>) => {
    const result = await createTask({ ...values, patientId: id });
    if (result.success) {
      form.reset();
      setSuccess(result.success);
      setError(undefined);
      setTimeout(() => {
        setSuccess(undefined);
        router.push('/tasks');
      }, 1000);
    } else {
      setError(result.error);
    }
  };

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
          {roomNumber && <p>Room: {roomNumber}</p>}
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-4 text-sky-700'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormToggleGroup
              name='categoryName'
              label='Category'
              items={taskCategoriesWithIcon.map(({ name, icon }) => ({
                item: (
                  <div className='flex flex-col items-center'>
                    {icon}
                    {name}
                  </div>
                ),
                value: name,
              }))}
              onChange={() => {
                setCategory(form.getValues().categoryName);
              }}
            />

            <FormSelect
              name='subCategoryName'
              label='Sub category'
              placeholder='Select a a sub category'
              options={subCategories}
            />

            <FormTextArea
              name='comments'
              label='Comment'
              placeholder='Type your message here.'
            />

            <FormSelect
              name='status'
              label='Status'
              placeholder='Select a status'
              options={taskStatuses.map((status) => status.name)}
            />

            <FormSelect
              name='assignedToUser'
              label='Assigned to'
              placeholder='Select user to assign'
              options={users.map((user) => user.username)}
            />

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
              <FormDatePicker
                name='dueDate'
                label=''
                fromYear={2024}
                toYear={2025}
                future
              />
            )}

            <FormSwitch name='isUrgent' label='Urgent' />

            <FormSuccess message={success} />
            <FormError message={error} />
            <FormButton>Save Task</FormButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
