import { FaUserDoctor } from 'react-icons/fa6';

export const NavBar = () => {
  return (
    <nav className='h-16 w-full bg-[#096F9F] text-white flex items-center'>
      <div className='flex items-center gap-3 ml-4'>
        <FaUserDoctor className='w-10 h-10' />
        <span className='font-bold text-xl tracking-wide'>AppName</span>
      </div>
    </nav>
  );
};
