// api/theme/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { theme } = await req.json();

  await prisma.user.update({
    where: { email: session.user.email! },
    data: { theme },
  });

  return new Response('Theme updated', { status: 200 });
}
