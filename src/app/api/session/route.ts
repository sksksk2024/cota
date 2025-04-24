// api/session/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { parse } from 'cookie';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Try to get theme from the custom user cookie
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const customUser = cookies.user ? JSON.parse(cookies.user) : null;

    return new Response(
      JSON.stringify({ theme: customUser?.theme ?? 'theme1' }),
      { status: 200 }
    );
  }

  // For OAuth users, fetch theme from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { theme: true },
  });

  return new Response(JSON.stringify({ theme: user?.theme ?? 'theme1' }), {
    status: 200,
  });
}
