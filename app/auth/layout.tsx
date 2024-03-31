import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
      {children}
    </div>
  )
}

export default AuthLayout
