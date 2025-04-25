import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);

  let user = null;

  try {
    console.log('Cookie header:', cookieHeader); // Log the raw cookie header
    if (cookies.user) {
      console.log('User cookie:', cookies.user); // Log the cookie value
      user = JSON.parse(cookies.user); // Try parsing the user cookie
    }
  } catch (err) {
    console.error('Failed to parse user cookie:', err);
    return NextResponse.json(
      { error: 'Invalid user cookie.' },
      { status: 400 }
    );
  }

  console.log('Parsed cookies:', cookies);
  console.log('User:', user);

  return NextResponse.json({ user });
}
