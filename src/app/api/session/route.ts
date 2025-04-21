import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ theme: null }), {
      status: 200,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { theme: true },
  });

  return new Response(JSON.stringify({ theme: user?.theme ?? 'theme1' }), {
    status: 200,
  });
}
