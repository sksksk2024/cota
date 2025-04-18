// /app/api/editprofile/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { forgotPasswordSchema } from '@/lib/schemas';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // const { email, newPassword } = await req.json();
  const body = await req.json();
  const result = forgotPasswordSchema.safeParse(body);

  if (!result.success) {
    const firstIssue = result.error.issues[0]?.message || 'Invalid input';
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { email, newPassword } = result.data;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: email.toLowerCase() },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'Password reset successful' });
}
