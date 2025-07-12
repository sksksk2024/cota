// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parse } from 'cookie';
import { getStripePriceId, StripeProduct } from '@/lib/stripePrices';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const { product } = await req.json();

  // Try to get user from cookie
  let user: { id: string; email: string } | null = null;
  if (cookies.user) {
    try {
      user = JSON.parse(cookies.user);
    } catch {
      user = null;
    }
  }

  // If not in cookie, try session (NextAuth)
  if (!user) {
    const session = await getServerSession(authOptions);
    if (session?.user?.email && session?.user?.id) {
      user = { id: session.user.id, email: session.user.email };
    }
  }

  // If still no user, unauthorized
  if (!user || !user.id || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Validate and get price ID
    const priceId = getStripePriceId(product as StripeProduct);

    const isDonation = product.startsWith('Donation');
    const cancelUrl = `${req.headers.get('origin')}/cancel?type=${isDonation ? 'donation' : 'service'}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
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
