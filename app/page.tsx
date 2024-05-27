import { TaskCard } from '@/components/TaskCard';
import Link from 'next/link';

import { auth, signOut } from '@/auth'; //test

const page = async () => {
  const session = await auth(); // test

  if (!session) return <div>Not authenticated</div>; //test
  return (
    <div className='flex flex-col items-center'>
      <Link className='underline' href='/auth/login'>
        Login page
      </Link>
      <Link className='underline' href='/auth/create-user'>
        Create user page
      </Link>
      <Link className='underline' href='/patients/create'>
        Create patient page
      </Link>
      <form //test
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  );
};

export default page;
