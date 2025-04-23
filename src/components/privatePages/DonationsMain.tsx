'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/hooks/useToast';
import {
  piggyWiggle,
  buttonVariants,
} from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import PiggyBank from '@/components/svgs/PiggyBank';
import ProtectedPageAll from '@/components/ProtectedPageAll';
import Link from 'next/link';

const Donations = () => {
  const { success, error, loading, dismiss } = useToast();
  const { theme } = useThemeStore();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handlePayment = async () => {
    loading('Redirecting to Stripe Checkout...');

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!data.sessionId) {
        throw new Error('No sessionId returned from /api/checkout');
      }

      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: any) {
      console.error(err);
      error('Something went wrong during checkout.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

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
          Donations Page
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
                className="bg-white dark:bg-gray-900 rounded-2xl p-10 w-full max-w-lg shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <h2
                  id="donation-title"
                  className="text-xl text-center text-textis font-bold mb-4"
                >
                  Help Keep Us Going <br /> 😁⚡
                </h2>

                <p className="text-center text-textis mb-6">
                  Thank you for considering donating! <br /> Every bit helps.
                </p>

                <button
                  onClick={handlePayment}
                  className="text-white font-semibold w-full bg-green-500 py-3 px-6 rounded-lg cursor-pointer hover:bg-green-600"
                >
                  Donate 5 lei
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 mt-4 w-full text-sm cursor-pointer hover:underline"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <Link
            className={`cursor-pointer p-16P rounded-5BR font-bold tracking-wide
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
            `}
            href="/"
            passHref
          >
            Go Home
          </Link>
        </motion.button>
      </main>
    </ProtectedPageAll>
  );
};

export default Donations;
