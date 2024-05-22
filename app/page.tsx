import { auth } from '@/auth'; //test

const page = async () => {
  const session = await auth(); // test

  return (
    <div className='flex items-center justify-center'>
      {session ? <p>Home page</p> : <p>Not authenticated</p>}
    </div>
  );
};

export default page;
