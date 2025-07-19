'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import successfulMe from '@/images/successfulMe.webp';
import Image from 'next/image';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { useSound } from '@/components/hooks/useSound';
import { yay } from '@/components/sounds/sounds';
import { useSearchParams } from 'next/navigation';

const SuccessPage = () => {
  const { play: playYay } = useSound(yay, 0.2);

  const { theme } = useThemeStore();

  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <main
      onMouseEnter={playYay}
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
        {type === 'donation' ? (
          <h1>Thanks for the donation. It means a lot. 🥲🎉</h1>
        ) : (
          <h1>
            Thanks for purchasing from us. We are coming back to you as soon as
            posible.
          </h1>
        )}

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
          src={successfulMe}
          className="absolute -bottom-256I w-400W opacity-40"
          alt="me successful"
        />
      </section>
    </main>
  );
};

export default SuccessPage;
