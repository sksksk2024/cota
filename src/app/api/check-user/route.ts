import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  console.log('Cookie Header:', cookieHeader);

  const cookies = parse(cookieHeader);
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  console.log('Parsed cookies:', cookies);
  console.log('User cookie:', cookies.user);

  return NextResponse.json({ user });
}
