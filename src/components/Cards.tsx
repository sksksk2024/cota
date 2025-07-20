'use client';
import { useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import { useToast } from '@/components/hooks/useToast';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import {
  buttonVariants,
  principlePriceVariant,
  secondaryPriceVariant,
} from './motionVariants/motionVariants';
import { STRIPE_PRODUCTS, StripeProduct } from '@/lib/stripePrices';
import { useSound } from './hooks/useSound';
import { click, ding, errorSound, yay } from './sounds/sounds';
import { useTranslation } from './hooks/useTranslation';

interface PricingData {
  title: string;
  desc: string;
  info1: string;
  info2?: number | string;
  info3?: number | string;
  info4?: number | string;
  info5?: number | string;
  info6?: string;
  info7?: string;
}

const Cards = ({ data }: { data: PricingData[] }) => {
  const { t } = useTranslation();
  const { play: playClick } = useSound(click, 0.01);
  const { play: playHover } = useSound(ding, 0.1);
  const { play: playError } = useSound(errorSound, 0.1);
  const { play: playYay } = useSound(yay, 0.1);

  const { error, loading } = useToast();
  const [principle] = useState<string | null>(null);
  const { theme } = useThemeStore();

  const priceButtonClasses = `relative w-full py-8P rounded-5BR cursor-pointer font-bold tracking-wide hover:border-2 border-textis ${
    theme === 'theme1'
      ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
      : 'bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
  }`;

  const handlePayment = async (productName: string) => {
    loading('Redirecting to Stripe Checkout...');
    try {
      // Validate product exists
      if (!(productName in STRIPE_PRODUCTS)) {
        playError();
        throw new Error('Invalid product selection');
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product: productName }),
      });

      const data = await response.json();
      if (!data.sessionId) {
        playError();
        throw new Error(
          'Sign Up or Sign In First. Click on the Burger Menu above!'
        );
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      playYay();
    } catch (err: unknown) {
      playError();
      error(err instanceof Error ? err.message : 'Checkout failed');
    }
  };

  const handlePrinciple = (title: string) =>
    [t('legendary.title'), t('community.title'), t('mentoring.title')].includes(
      title
    );
  return (
    <>
      {data.map((item, index) => {
        // Check if this card is the principle one
        const isPrinciple = !principle && handlePrinciple(item.title);
        let priceService = 0;
        if (typeof item.info2 === 'number') {
          priceService = item.info2;
        } else if (typeof item.info3 === 'number') {
          priceService = item.info3;
        } else if (typeof item.info4 === 'number') {
          priceService = item.info4;
        } else if (typeof item.info5 === 'number') {
          priceService = item.info5;
        } else {
          priceService = 0;
        }
        let altTitle = item.title;

        switch (item.title) {
          case 'Pachetul Comun':
            altTitle = 'Common Pack';
            break;
          case 'Pachetul Rar':
            altTitle = 'Rare Pack';
            break;
          case 'Pachetul Legendar':
            altTitle = 'Legendary Pack';
            break;
          case 'La Distanta':
            altTitle = 'Remote';
            break;
          case 'Comunitatea Noastra':
            altTitle = 'Our Community';
            break;
          case 'Unu la Unu':
            altTitle = 'One on One';
            break;
          case 'Mentorat':
            altTitle = 'Mentoring';
            break;
          default:
            break;
        }

        return (
          <motion.div
            key={index}
            variants={
              isPrinciple ? principlePriceVariant : secondaryPriceVariant
            }
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            animate="exit"
            className={`
              ${isPrinciple ? 'z-50' : 'z-40'}
              relative flex flex-col justify-between items-center gap-10 p-32P shadow-lg mx-auto rounded-lg ${
                isPrinciple
                  ? `${theme === 'theme1' ? 'bg-green-cyan-light text-textis' : 'bg-deep-dark text-white'} `
                  : `${theme === 'theme1' ? 'bg-warning' : 'bg-highlight'} text-textis scale-y-90`
              }`}
          >
            <div className="card text-center min-w-[320px] max-w-[320px]">
              <h2
                aria-label="choose a plan"
                className="text-sm font-bold mb-16M"
              >
                {item.title}
              </h2>
              <h3 className="text-2xl font-bold mb-16M">{item.desc}</h3>
              <div
                className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
              />
              <p className="font-semibold text-lg py-8P">{item.info1}</p>
              {item.info2 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">
                    {item.info2}
                    {typeof item.info2 === 'number' ? ' lei' : ''}
                  </p>
                </>
              )}
              {item.info3 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">
                    {item.info3}
                    {typeof item.info3 === 'number' ? ' lei' : ''}
                  </p>
                </>
              )}
              {item.info4 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">
                    {item.info4}
                    {typeof item.info4 === 'number' ? ' lei' : ''}
                  </p>
                </>
              )}
              {item.info5 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">
                    {item.info5}
                    {typeof item.info5 === 'number' ? ' lei' : ''}
                  </p>
                </>
              )}
              {item.info6 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info6}</p>
                </>
              )}
              {item.info7 && (
                <>
                  <div
                    className={`
                    ${isPrinciple ? 'bg-highlight' : 'bg-textis'}
                    w-full h-1 opacity-20 my-16M`}
                  />
                  <p className="font-semibold text-lg py-8P">{item.info7}</p>
                </>
              )}
            </div>
            <motion.button
              aria-label="learn more"
              variants={buttonVariants}
              initial="hidden"
              whileHover="hover"
              onClick={() => {
                playClick();
                handlePayment(altTitle as StripeProduct);
              }}
              onMouseEnter={playHover}
              className={`${priceButtonClasses}`}
            >
              <span className="hover:relative hover:bottom-64I">
                {item.title === t('community.title')
                  ? t('startWith.title2')
                  : `${t('startWith.title1')} ${
                      item.title === t('mentoring.title')
                        ? Math.floor(priceService * 0.2)
                        : Math.floor(priceService * 0.5)
                    } lei`}
              </span>
            </motion.button>
          </motion.div>
        );
      })}
    </>
  );
};

export default Cards;
