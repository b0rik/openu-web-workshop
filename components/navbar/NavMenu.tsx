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
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { NavLink } from '@/components/navbar/NavLink';

import { Menu } from 'lucide-react';

export const NavMenu = async () => {
  const session = await auth();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <ul className='flex flex-col gap-6'>
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
            <>
              <NavLink href='/auth/login'>
                <SheetClose>Login</SheetClose>
              </NavLink>
            </>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
