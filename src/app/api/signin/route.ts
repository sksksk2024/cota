import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { signinSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const result = signinSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  const { email, password } = result.data;

  // Verifies if it's an unique user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  // Verifies if the password from db is identical with the one from the input
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

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

  const res = NextResponse.json({ message: 'Sign In successful', user });
  res.headers.set('Set-Cookie', cookie);

  return res;
}
