'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import cancelMe from '@/images/cancelMe.webp';
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
          {/* 🛑 the emoji to be in the favicon of this page(near future) */}
        </h1>

        <p className="text-lg mt-2">Come back anytime — we’ll be here.</p>

        <motion.button
          className={`z-50 w-full min-w-container-300 max-w-container-600 text-center text-md cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          variants={buttonVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link href="/donations" passHref>
            Try Again
          </Link>
        </motion.button>

        {/* HOME LINK */}
        <motion.button
          className={`z-50 w-full min-w-container-300 max-w-container-600 text-center text-md cursor-pointer p-16P rounded-5BR font-bold tracking-wide
        ${
          theme === 'theme1'
            ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
            : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
        }
        `}
          variants={buttonVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link href="/" passHref>
            Go Home
          </Link>
        </motion.button>

        <Image
          src={cancelMe}
          className="absolute -bottom-256I w-400W opacity-40"
          alt="me looking serious in the phone"
        />
      </section>
    </main>
  );
};

export default CancelPage;
