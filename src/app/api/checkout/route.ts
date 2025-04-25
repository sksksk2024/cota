import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parse } from 'cookie';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);

  let user: { id: string; email: string } | null = null;

  try {
    if (cookies.user) {
      user = JSON.parse(cookies.user);
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Invalid user cookie, ${err}` },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Help Keep Us Going 😁⚡',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      metadata: {
        userId: user?.id,
        userEmail: user?.email,
      },
    } as Stripe.Checkout.SessionCreateParams); // 👈 This is key (very important, in order to work)

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Stripe error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }

    return NextResponse.json(
      { error: 'Something went wrong while creating the checkout session.' },
      { status: 500 }
    );
  }
}
