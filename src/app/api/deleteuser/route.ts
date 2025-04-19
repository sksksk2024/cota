import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  let userId: string | undefined;

  try {
    const session = await getServerSession(authOptions);
    userId = session?.user?.id;

    if (!userId) {
      const body = await req.json();
      userId = body?.userId;
      if (!userId) {
        return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
      }
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    const clearNextAuth = serialize('next-auth.session-token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    const clearCustom = serialize('user', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    const res = NextResponse.json({ message: 'User Deleted' }, { status: 200 });
    res.headers.set('Set-Cookie', [clearNextAuth, clearCustom].join(', '));

    return res;
  } catch (err) {
    console.error('Error deleting user:', err);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
