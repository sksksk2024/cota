// api/theme/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { parse, serialize } from 'cookie';

export async function POST(req: Request) {
  const body = await req.json();
  const { theme } = body;

  const session = await getServerSession(authOptions);
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const customUser = cookies.user ? JSON.parse(cookies.user) : null;

  try {
    if (session?.user?.email) {
      // Update DB for OAuth user
      await prisma.user.update({
        where: { email: session.user.email },
        data: { theme },
      });
    }

    // Set cookie regardless of session
    const email = session?.user?.email || customUser?.email;

    // Merging to save everything
    const updatedUser = {
      ...customUser,
      email,
      theme,
    };

    const cookie = serialize('user', JSON.stringify(updatedUser), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });

    const response = NextResponse.json({
      message: 'Theme updated successfully',
    });
    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (err) {
    console.error('Failed to update theme:', err);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
}
