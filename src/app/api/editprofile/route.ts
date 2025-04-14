import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, name, image } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { name, image },
  });

  return NextResponse.json({ message: 'User updated', user }, { status: 200 });
}
