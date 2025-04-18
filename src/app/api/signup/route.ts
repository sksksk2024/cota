import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { signupSchema } from '@/lib/schemas';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  const { name, email, password } = result.data;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Set cookie to mark user as signed up
  const cookie = serialize('user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 'secure' in production
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration
    path: '/',
  });

  const response = NextResponse.json(
    { message: 'User Signed Up', user },
    { status: 201 }
  );

  response.headers.set('Set-Cookie', cookie);
  return response;
}
