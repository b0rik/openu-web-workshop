import Link from 'next/link';

import { NavMenu } from '@/components/navbar/NavMenu';

import { auth } from '@/auth';
import { Hospital, Ribbon } from 'lucide-react';

const appName = 'Meditask Manager';

export const NavBar = async () => {
  const navLinks = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Patients',
      href: '/patients',
    },
    {
      title: 'Tasks',
      href: '/tasks',
    },
  ];

  const session = await auth();

  if (session?.user?.canManageUsers) {
    navLinks.push({ title: 'Create user', href: '/auth/create-user' });
  }

  return (
    <nav className='flex h-16 w-full items-center justify-between bg-sky-800 px-4 text-white'>
      <Link href='/' className='my-4 flex cursor-pointer items-center gap-3'>
        <Hospital className='h-10 w-10' />
        <span className='text-xl font-bold tracking-wide'>{appName}</span>
        <Ribbon className='h-8 w-8 text-yellow-300' />
      </Link>
      <NavMenu navLinks={navLinks} />
    </nav>
  );
};
