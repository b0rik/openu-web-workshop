import { auth } from '@/auth';

const loginPath = '/auth/login';

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
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
