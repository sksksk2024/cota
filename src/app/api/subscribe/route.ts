import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // not just 'next-auth'
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { newsLetterSchema } from '@/lib/schemas';
import { Resend } from 'resend';
import { parse } from 'cookie';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const parsed = newsLetterSchema.safeParse(body);

    if (!parsed.success) {
      const errorList = parsed.error.errors.map((e) => e.message).join('\n');
      return NextResponse.json({ error: errorList }, { status: 400 });
    }

    // 👇 Get cookies for custom user
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const customUser = cookies.user ? JSON.parse(cookies.user) : null;

    // 👇 Use priority: next-auth session > custom user cookie > manual input
    const email =
      session?.user?.email || customUser?.email || parsed.data.email;

    if (!email) {
      return NextResponse.json(
        { error: `Please enter a valid email address.` },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You are already subscribed!' },
        { status: 400 }
      );
    }

    console.log(`New subscription: ${email}`);

    await prisma.newsletterSubscription.create({
      data: { email },
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thanks for Subscribing',
      html: `<p>You have successfully subscribed to our newsletter.</p>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/subscribe:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
