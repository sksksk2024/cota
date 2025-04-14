// /app/api/signout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const response = NextResponse.redirect(new URL('/signin', baseUrl));

    response.cookies.set('user', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
    });

    response.headers.set('Access-Control-Allow-Origin', '*'); // Or better, your frontend origin
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
  } catch (error) {
    console.error('Signout API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
