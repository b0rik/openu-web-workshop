'use client';

import { logoutUser } from '@/actions/auth';

import { Button } from '@/components/ui/button';

export const LogoutButton = ({ className = '' }: { className?: string }) => {
  return (
    <Button
      onClick={async () => {
        await logoutUser();
      }}
      className={className}
    >
      Logout
    </Button>
  );
};
