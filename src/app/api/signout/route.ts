// app/api/signout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const response = NextResponse.redirect(new URL('/signin', baseUrl));

    // Clear custom user cookie
    const clearUserCookie = serialize('user', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // Clear NextAuth session cookie (basic)
    const clearNextAuthCookie = serialize('next-auth.session-token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.headers.set(
      'Set-Cookie',
      [clearUserCookie, clearNextAuthCookie].join(', ')
    );

    return response;
  } catch (error) {
    console.error('Signout API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
