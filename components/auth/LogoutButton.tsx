'use client';

import { logoutUser } from '@/actions/auth';

import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  const onLogoutClick = async () => {
    await logoutUser();
  };

  return <Button onClick={onLogoutClick}>Logout</Button>;
};
