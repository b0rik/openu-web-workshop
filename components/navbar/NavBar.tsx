import { Hospital } from 'lucide-react';

export const NavBar = () => {
  return (
    <nav className='flex h-16 w-full items-center bg-sky-800 text-white'>
      <div className='m-4 flex items-center gap-3'>
        <Hospital className='h-10 w-10' />
        <span className='text-xl font-bold tracking-wide'>
          Meditask Manager
        </span>
      </div>
    </nav>
  );
};
