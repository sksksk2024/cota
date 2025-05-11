import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { parse } from 'cookie';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // Parse body
    const body = await req.json();
    const { score } = body;

    if (typeof score !== 'number' || score <= 0) {
      return NextResponse.json({ message: 'Invalid score' }, { status: 400 });
    }

    // Get session-based user (OAuth)
    const session = await getServerSession(authOptions);

    // Get custom-auth user from cookies
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const customUser = cookies.user ? JSON.parse(cookies.user) : null;

    // Extract the user's email form cookies
    const email = session?.user?.email || customUser?.email;

    if (!email) {
      return NextResponse.json(
        { message: 'Unauthorized: No valid user found' },
        { status: 401 }
      );
    }

    // Lookup user in DB
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Save the score
    await prisma.highScore.create({
      data: {
        userId: user.id,
        game: 'STACK_ATTACK',
        score,
      },
    });

    return NextResponse.json({ message: 'Score saved' }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/highscore/stackattack:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const scores = await prisma.highScore.findMany({
      where: { game: 'STACK_ATTACK' },
      orderBy: { score: 'desc' },
      take: 10,
      include: { user: true },
    });

    const formattedScores = scores.map((entry) => ({
      id: entry.id,
      username: entry.user.name,
      score: entry.score,
    }));

    return NextResponse.json({ scores: formattedScores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
