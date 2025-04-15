// /app/api/editprofile/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();

  if (!email || !newPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

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
