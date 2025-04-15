import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  // Serialize user into a cookie (DON'T do this in production — use tokens instead)
  const cookie = serialize('user', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // Delete the cookie immediately
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const res = NextResponse.json({ message: 'User Deleted' }, { status: 200 });
  res.headers.set('Set-Cookie', cookie);

  return res;
}
