'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import Image from 'next/image';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';

const CancelPage = () => {
  const { theme } = useThemeStore();

  return (
    <main
      className={`overflow-y-clip h-[100dvh] ${
        theme === 'theme1'
          ? 'text-white bg-deep-dark'
          : 'text-background-dark bg-green-cyan-light'
      }`}
    >
      {/* LOGO */}
      <section
        className={`relative flex flex-col justify-start items-center gap-10 px-32P py-112P text-2xl text-center font-bold h-3/4
          
          `}
      >
        <h1 className="leading-tight">
          No stress! Payment was canceled.{' '}
          {/* <span className="inline-block align-middle">🛑</span> */}
        </h1>

        <p className="text-lg mt-2">Come back anytime — we’ll be here.</p>

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
            href="/donations"
            passHref
          >
            Try Again
          </Link>
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

        {/* <Image
          src={logo}
          className="absolute -bottom-256I w-400W"
          alt="me building"
        /> */}
      </section>
    </main>
  );
};

export default CancelPage;
