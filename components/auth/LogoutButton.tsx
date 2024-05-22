import { logoutUser } from '@/actions/auth';

import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  return (
    <form action={logoutUser}>
      <Button>Logout</Button>
    </form>
  );
};
