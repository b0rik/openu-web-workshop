import { PatientCard } from '@/components/PatientCard';
import { TaskCard } from '@/components/TaskCard';
import Link from 'next/link';

import { auth, signOut } from '@/auth'; //test

const page = async () => {
  const session = await auth(); // test

  if (!session) return <div>Not authenticated</div>; //test
  return (
    <main className='flex flex-col items-center'>
      <Link className='underline' href='/auth/login'>
        Login page
      </Link>
      <Link className='underline' href='/auth/create-user'>
        Create user page
      </Link>
      <PatientCard />
      <TaskCard />
      <form //test
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </main>
  );
};

export default page;
