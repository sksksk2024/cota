import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, email, password } = await req.json();

  if (!userId || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User Updated', user }, { status: 200 });
}
