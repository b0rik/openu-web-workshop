import { auth } from '@/auth';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { NavLink } from '@/components/navbar/NavLink';

import { Menu } from 'lucide-react';
type NavMenuProps = {
  navLinks: { title: string; href: string }[];
};
export const NavMenu = async ({ navLinks }: NavMenuProps) => {
  const session = await auth();

  return (
    <div>
      <div className='hidden items-center gap-6 lg:flex'>
        {session ? (
          <>
            {navLinks.map((link, i) => (
              <NavLink href={link.href} key={i}>
                {link.title}
              </NavLink>
            ))}
            <LogoutButton />
          </>
        ) : (
          <NavLink href='/auth/login'>Login</NavLink>
        )}
      </div>
      <Sheet>
        <SheetTrigger className='lg:hidden'>
          <Menu />
        </SheetTrigger>
        <SheetContent className='lg:hidden'>
          <div className='mt-6 flex flex-col gap-6'>
            {session ? (
              <>
                {navLinks.map((link, i) => (
                  <NavLink key={i} href={link.href}>
                    <SheetClose>{link.title}</SheetClose>
                  </NavLink>
                ))}
                <SheetClose>
                  <LogoutButton className='w-full' />
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
