import { auth } from '@/auth';

const loginPath = '/auth/login';
const createUserPath = '/auth/create-user';
const createPatientPath = '/patients/create';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;

  if (path === loginPath) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', req.url));
    }
    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/auth/login', req.url));
  }

  if (path === createUserPath && !req.auth?.user?.canManageUsers) {
    return Response.redirect(new URL('/', req.url));
  }

  if (path === createPatientPath && !req.auth?.user?.canManagePatients) {
    return Response.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
