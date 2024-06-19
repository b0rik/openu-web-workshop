import { auth } from '@/auth';

import { getUserUnits } from '@/data/users';

import Link from 'next/link';

import { UnitSelect } from '@/components/UnitSelect';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getUserTasksWithPatientsByUnit } from '@/data/tasks';
import { TasksAccordion } from '@/components/taskList/TasksAccordion';
import { ListTodo, UserPlus, UsersRound } from 'lucide-react';

const HomeNav = ({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <Link className='shadow-lg' href={href}>
      <div className='flex h-auto flex-col items-center justify-center bg-sky-400 p-4'>
        <div>{icon}</div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

const page = async () => {
  const session = await auth();
  const { user } = session!;

  const units = await getUserUnits(user!.email as string);

  const userTasks = await getUserTasksWithPatientsByUnit(
    user!.email as string,
    user!.activeUnit as string
  );

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 4
      ? 'Good Evening'
      : currentHour < 12
        ? 'Good Morning'
        : currentHour < 22
          ? 'Good Afternoon'
          : 'Good Evening';

  return (
    <div className='mx-auto flex w-full items-center justify-center'>
      <Card className='flex w-full max-w-3xl flex-col'>
        <CardHeader>
          <h1>
            {greeting}{' '}
            <strong>{`${user?.firstName.toUpperCase()} ${user?.lastName.toUpperCase()}`}</strong>
          </h1>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid auto-rows-max gap-6 min-[425px]:grid-cols-2'>
            <HomeNav href='/patients' icon={<UsersRound />} title='Patients' />
            <HomeNav href='/tasks' icon={<ListTodo />} title='All tasks' />
            {user?.canManageUsers && (
              <HomeNav
                href='/auth/create-user'
                icon={<UserPlus />}
                title='Create user'
              />
            )}
            <div className='col-span-full space-y-2'>
              <h1>Active unit:</h1>
              <UnitSelect units={units.map((unit) => unit.name)} />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-6'>
              <h1>Tasks assigned to you:</h1>
              <TasksAccordion tasks={userTasks} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
