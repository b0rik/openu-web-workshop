import Link from 'next/link';

import { auth } from '@/auth';

import { LogoutButton } from '@/components/auth/LogoutButton';
import { NavLink } from '@/components/navbar/NavLink';

import { Hospital } from 'lucide-react';

const appName = 'Meditask Manager';

export const NavBar = async () => {
  const session = await auth();

  return (
    <nav className='flex h-16 w-full items-center justify-between bg-sky-800 px-4 text-white'>
      <Link href='/' className='my-4 flex cursor-pointer items-center gap-3'>
        <Hospital className='h-10 w-10' />
        <span className='text-xl font-bold tracking-wide'>{appName}</span>
      </Link>

      <ul className='flex items-center gap-4'>
        {session ? (
          <>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/patients'>Patients</NavLink>
            <NavLink href='/tasks'>Tasks</NavLink>
            <LogoutButton />
          </>
        ) : (
          <NavLink href='/auth/login'>Login</NavLink>
        )}
      </ul>
    </nav>
  );
};
