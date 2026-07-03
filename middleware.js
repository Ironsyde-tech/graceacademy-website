import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const needsAuth = pathname.startsWith('/admin/careers') || pathname.startsWith('/api/admin/careers');

  if (!needsAuth) {
    return NextResponse.next();
  }

  const session = request.cookies.get('careers_admin_session')?.value;
  if (session === 'authenticated') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin/careers')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/careers/:path*', '/api/admin/careers/:path*'],
};