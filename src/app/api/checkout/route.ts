// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parse } from 'cookie';
import { getStripePriceId, StripeProduct } from '@/lib/stripePrices';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil', // Updated to stable version
});

export async function POST(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const { product } = await req.json();

  // Validate user session
  let user: { id: string; email: string };
  try {
    if (!cookies.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    user = JSON.parse(cookies.user);

    if (!user?.id || !user?.email) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid user session', err },
      { status: 400 }
    );
  }

  try {
    // Validate and get price ID
    const priceId = getStripePriceId(product as StripeProduct);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      metadata: {
        userId: user.id,
        userEmail: user.email,
        productName: product,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
