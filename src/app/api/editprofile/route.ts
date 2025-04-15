import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, name, email, password } = await req.json();

  if (!userId || !name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Serialize user into a cookie (DON'T do this in production — use tokens instead)
  const cookie = serialize(
    'user',
    JSON.stringify({ id: user.id, name: user.name, email: user.email }),
    {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }
  );

  const res = NextResponse.json(
    { message: 'User Updated', user },
    { status: 200 }
  );
  res.headers.set('Set-Cookie', cookie);

  return res;
}
