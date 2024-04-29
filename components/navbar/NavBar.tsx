import { Hospital } from 'lucide-react';

export const NavBar = () => {
  return (
    <nav className='h-16 w-full bg-[#096F9F] text-white flex items-center'>
      <div className='flex items-center gap-3 m-4'>
        <Hospital className='w-10 h-10' />
        <span className='font-bold text-xl tracking-wide'>
          Meditask Manager
        </span>
      </div>
    </nav>
  );
};
