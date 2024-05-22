import { auth } from '@/auth';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { NavLink } from '@/components/navbar/NavLink';

import { Menu } from 'lucide-react';

export const NavMenu = async () => {
  const session = await auth();

  return (
    <div>
      <div className='hidden items-center gap-6 md:flex'>
        {session ? (
          <>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/patients'>Patients</NavLink>
            <NavLink href='/tasks'>Tasks</NavLink>
            <LogoutButton />
          </>
        ) : (
          <NavLink href='/auth/login'>Login</NavLink>
        )}
      </div>
      <Sheet>
        <SheetTrigger className='md:hidden'>
          <Menu />
        </SheetTrigger>
        <SheetContent className='md:hidden'>
          <div className='flex flex-col gap-6'>
            {session ? (
              <>
                <NavLink href='/'>
                  <SheetClose>Home</SheetClose>
                </NavLink>
                <NavLink href='/patients'>
                  <SheetClose>Patients</SheetClose>
                </NavLink>
                <NavLink href='/tasks'>
                  <SheetClose>Tasks</SheetClose>
                </NavLink>
                <SheetClose>
                  <LogoutButton />
                </SheetClose>
              </>
            ) : (
              <NavLink href='/auth/login'>
                <SheetClose>Login</SheetClose>
              </NavLink>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
