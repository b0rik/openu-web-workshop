import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center items-center grow bg-gradient-to-b from-[#096F9F] to-[#00AEEF]'>
      {children}
    </div>
  )
}

export default AuthLayout
