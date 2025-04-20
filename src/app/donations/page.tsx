'use client';

import { useToast } from '@/components/hooks/useToast';
import { motion } from 'framer-motion';
import { piggyWiggle } from '@/components/motionVariants/motionVariants';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useRouter } from 'next/navigation';
import PiggyBank from '@/components/svgs/PiggyBank';
import Link from 'next/link';

const Donations = () => {
  const { success, error, loading, dismiss } = useToast();

  const router = useRouter();

  const { theme } = useThemeStore();

  const handlePayment = () => {
    setTimeout(() => {
      loading('Going to Payments Page...');

      setTimeout(() => {
        dismiss(); // dismiss only the one you opened
        router.push('/');
      }, 3000);
    }, 1000);
  };

  return (
    <main
      className={`w-full h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
    >
      {/* PAGE TITLE */}
      <h1
        className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
      >
        Donations Page
      </h1>
      <motion.button
        className="min-w-container-300 w-full max-w-container-600 cursor-pointer"
        onClick={handlePayment}
        variants={piggyWiggle}
        initial="initial"
        whileTap="tap"
        whileHover="hover"
      >
        <PiggyBank />
      </motion.button>

      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
      >
        <Link
          className={`cursor-pointer px-16P py-8P rounded-5BR font-bold tracking-wide
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
  );
};

export default Donations;
