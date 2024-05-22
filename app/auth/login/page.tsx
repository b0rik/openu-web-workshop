import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { LoginForm } from '@/components/auth/LoginForm';

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className='mx-auto max-w-md'>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
