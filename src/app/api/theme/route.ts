import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { parse } from 'cookie';

const getUserFromRequest = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const customUser = cookies.user ? JSON.parse(cookies.user) : null;

  const email = session?.user?.email || customUser?.email;
  return { email, session, customUser };
};

export async function GET(req: Request) {
  const { email } = await getUserFromRequest(req);

  if (!email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ theme: user.theme || null }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { email, customUser } = await getUserFromRequest(req);
    const { theme } = await req.json();

    if (!email || (theme !== 'theme1' && theme !== 'theme2')) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // 🔥 User exists in database (OAuth or custom user that has been saved)
      await prisma.user.update({
        where: { email },
        data: { theme },
      });
    } else if (customUser) {
      // 🔥 Custom user exists only in cookie - create or update ghost user
      await prisma.user.upsert({
        where: { email },
        update: { theme },
        create: {
          email,
          name: customUser.name || '', // or null if you prefer
          password: customUser.password || '', // or null
          theme,
        },
      });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update theme:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
