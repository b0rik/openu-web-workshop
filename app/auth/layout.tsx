import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex grow items-center bg-gradient-to-b from-[#096F9F] to-[#00AEEF] px-4'>
      <div className='mb-6 mt-6 w-full'>{children}</div>
    </div>
  );
};

export default AuthLayout;
