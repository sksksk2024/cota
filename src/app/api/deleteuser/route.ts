// app/api/deleteuser/route.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  // Try to get the session (GitHub/Google users)
  const session = await getServerSession(authOptions);

  let userId = session?.user?.id;

  // If session-based ID not found, try reading from body (manual users)
  if (!userId) {
    const { userId: bodyId } = await req.json();
    if (!bodyId) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }
    userId = bodyId;
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    // Clear both next-auth cookie & custom cookie for safety
    const res = NextResponse.json({ message: 'User Deleted' }, { status: 200 });

    const clearNextAuth = serialize('next-auth.session-token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    const clearCustomCookie = serialize('user', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.headers.set(
      'Set-Cookie',
      [clearNextAuth, clearCustomCookie].join(', ')
    );

    return res;
  } catch (err) {
    console.error('Error deleting user:', err);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
