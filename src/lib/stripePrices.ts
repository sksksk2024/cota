// lib/stripePrices.ts
export const STRIPE_PRICE_IDS = {
  'Common Pack': process.env.STRIPE_PRICE1_ID,
  'Rare Pack': process.env.STRIPE_PRICE2_ID,
  'Legendary Pack': process.env.STRIPE_PRICE3_ID,
  Remote: process.env.STRIPE_PRICE4_ID,
  'Our Community': process.env.STRIPE_PRICE5_ID,
  'One on One': process.env.STRIPE_PRICE6_ID,
  Mentoring: process.env.STRIPE_PRICE7_ID,
} as const;

export const STRIPE_DONATION_IDS = {
  Donation1: process.env.STRIPE_DONATION1_ID,
  Donation2: process.env.STRIPE_DONATION2_ID,
  Donation3: process.env.STRIPE_DONATION3_ID,
  Donation4: process.env.STRIPE_DONATION4_ID,
} as const;
