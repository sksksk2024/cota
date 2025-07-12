// Server-side product to price ID mapping
export const STRIPE_PRODUCTS = {
  'Common Pack': 'STRIPE_PRICE1_ID',
  'Legendary Pack': 'STRIPE_PRICE2_ID',
  'Rare Pack': 'STRIPE_PRICE3_ID',
  Remote: 'STRIPE_PRICE4_ID',
  'Our Community': 'STRIPE_PRICE5_ID',
  'One on One': 'STRIPE_PRICE6_ID',
  Mentoring: 'STRIPE_PRICE7_ID',
} as const;

export const STRIPE_DONATIONS = {
  Donation1: 'STRIPE_DONATION1_ID',
  Donation2: 'STRIPE_DONATION2_ID',
  Donation3: 'STRIPE_DONATION3_ID',
  Donation4: 'STRIPE_DONATION4_ID',
} as const;

export type StripeProduct = keyof typeof STRIPE_PRODUCTS;
export type StripeDonation = keyof typeof STRIPE_DONATIONS;

// For server-side use only
export const getStripePriceId = (
  product: StripeProduct | StripeDonation
): string => {
  const envVarName =
    STRIPE_PRODUCTS[product as StripeProduct] ||
    STRIPE_DONATIONS[product as StripeDonation];
  const priceId = process.env[envVarName];
  if (!priceId) throw new Error(`Missing ${envVarName} in environment`);
  return priceId;
};
