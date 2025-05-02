import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { newsLetterSchema } from '@/lib/schemas';
import { parse } from 'cookie';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    // Get raw JSON input
    const body = await req.json();

    // Validate with Zod schema
    const parsed = newsLetterSchema.safeParse(body);

    if (!parsed.success) {
      const errorList = parsed.error.errors.map((e) => e.message).join('\n');
      return NextResponse.json({ error: errorList }, { status: 400 });
    }

    // Read cookies
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const customUser = cookies.user ? JSON.parse(cookies.user) : null;

    // Priority: session > cookie > manual input
    const email =
      session?.user?.email || customUser?.email || parsed.data.email;

    if (!email) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
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

    // Save to DB
    await prisma.newsletterSubscription.create({
      data: { email },
    });

    console.log(`New subscription: ${email}`);

    // Send confirmation email to the user
    await sgMail.send({
      to: email,
      from: 'cota8091@gmail.com',
      subject: 'Thanks for Subscribing',
      html: `<p>You have successfully subscribed to our newsletter.</p>`,
    });

    // Send notification to you (the owner)
    await sgMail.send({
      to: 'cotaalexandru0403@gmail.com',
      from: 'cota8091@gmail.com',
      subject: `New Newsletter Subscription: ${email}`,
      html: `<p>${email} just subscribed to the newsletter.</p>`,
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
