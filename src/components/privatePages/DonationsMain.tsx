'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/hooks/useToast';
import {
  piggyWiggle,
  buttonVariants,
} from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { loadStripe } from '@stripe/stripe-js';
import PiggyBank from '@/components/svgs/PiggyBank';
import ProtectedPageAll from '@/components/ProtectedPageAll';
import Link from 'next/link';
import { STRIPE_DONATIONS, StripeDonation } from '@/lib/stripePrices';
import { useTranslation } from '../hooks/useTranslation';

const Donations = () => {
  const { t } = useTranslation();
  const { error, loading } = useToast();
  const { theme } = useThemeStore();

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const donationOptions = [
    {
      id: t('donationPrices.donation1'),
      amount: t('donationPrices.amount1'),
      label: t('donationPrices.label1'),
    },
    {
      id: t('donationPrices.donation2'),
      amount: t('donationPrices.amount2'),
      label: t('donationPrices.label2'),
    },
    {
      id: t('donationPrices.donation3'),
      amount: t('donationPrices.amount3'),
      label: t('donationPrices.label3'),
    },
    {
      id: t('donationPrices.donation4'),
      amount: t('donationPrices.amount4'),
      label: t('donationPrices.label4'),
    },
  ] as const;

  const handlePayment = async (donationId: StripeDonation) => {
    loading('Redirecting to Stripe Checkout...');

    try {
      // Validate donation exists
      if (!(donationId in STRIPE_DONATIONS)) {
        throw new Error('Invalid product selection');
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product: donationId }),
      });

      const data = await response.json();

      if (!data.sessionId) {
        throw new Error('No sessionId returned from /api/checkout');
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: unknown) {
      console.error(err);
      error('Something went wrong during checkout.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const altId = ['Donation1', 'Donation2', 'Donation3', 'Donation4'];

  return (
    <ProtectedPageAll>
      <main
        className={`w-full h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      >
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
          `}
        >
          {t('donations.title')}
        </h1>

        <motion.button
          aria-label="Open donation modal"
          className="min-w-container-300 w-full max-w-container-600 cursor-pointer"
          onClick={() => setShowModal(true)}
          variants={piggyWiggle}
          initial="initial"
          whileTap="tap"
          whileHover="hover"
        >
          <PiggyBank />
        </motion.button>

        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={modalRef}
              onClick={handleBackdropClick}
              role="dialog"
              aria-modal="true"
              aria-labelledby="donation-title"
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl p-10 w-full max-w-lg shadow-lg mx-16M"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <h2
                  id="donation-title"
                  className="text-xl text-center text-textis font-bold mb-4"
                >
                  {t('donations.motivation')} <br /> 😁⚡
                </h2>

                <p className="text-center text-textis mb-6">
                  {t('donations.thanks1')} <br />
                  {t('donations.thanks2')}
                </p>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-6">
                  {donationOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() =>
                        handlePayment(altId[index] as StripeDonation)
                      }
                      className="text-white font-semibold w-full bg-green-500 py-3 px-6 rounded-lg cursor-pointer hover:bg-green-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option.amount}
                      <span className="block text-xs font-normal">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 mt-4 w-full text-sm cursor-pointer hover:underline"
                >
                  {t('donations.cancel')}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          animate="exit"
          className={`w-full min-w-container-200 max-w-container-600 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
        >
          <Link href="/" passHref>
            {t('donations.home')}
          </Link>
        </motion.button>
      </main>
    </ProtectedPageAll>
  );
};

export default Donations;
