import { NextResponse } from 'next/server';
import { getCareersConfig } from '@/lib/careers/config';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

export async function POST(request) {
  const { username, password } = await request.json();
  const config = getCareersConfig();
  const allowedUsers = [config.admin.username, ...config.admin.emails].map(normalize);

  if (!allowedUsers.includes(normalize(username)) || password !== config.admin.password) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('careers_admin_session', 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}