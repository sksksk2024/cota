import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { editProfileSchema } from '@/lib/schemas';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const result = editProfileSchema.safeParse(body);

  if (!result.success) {
    const firstIssue = result.error.issues[0]?.message || 'Invalid input';
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { userId, name, email, password } = result.data;

  try {
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const cookie = serialize(
      'user',
      JSON.stringify({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      }),
      {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }
    );

    const res = NextResponse.json(
      { message: 'User Updated', user: updatedUser },
      { status: 200 }
    );
    res.headers.set('Set-Cookie', cookie);

    return res;
  } catch (err) {
    console.error('Error updating user:', err);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
