import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);

  let user = null;

  try {
    if (cookies.user) {
      user = JSON.parse(cookies.user);
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
