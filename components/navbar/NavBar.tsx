import Link from 'next/link';

import { NavMenu } from '@/components/navbar/NavMenu';

import { Hospital } from 'lucide-react';

const appName = 'Meditask Manager';

export const NavBar = async () => {
  return (
    <nav className='flex h-16 w-full items-center justify-between bg-sky-800 px-4 text-white'>
      <Link href='/' className='my-4 flex cursor-pointer items-center gap-3'>
        <Hospital className='h-10 w-10' />
        <span className='text-xl font-bold tracking-wide'>{appName}</span>
      </Link>
      <NavMenu />
    </nav>
  );
};
