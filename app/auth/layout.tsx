import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex grow items-center bg-gradient-to-b from-sky-800 to-sky-400 px-4'>
      <div className='mb-6 mt-6 w-full'>{children}</div>
    </div>
  );
};

export default AuthLayout;
