'use client';

import logo from '@/app/favicon.ico';
import Info from '@/components/Info';
import Header from '@/components/Header';
import Working from '@/components/Working';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Guide from '@/components/Guide';
import Image from 'next/image';
import { useUser } from '@/components/hooks/useUser';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import { useEffect, useState } from 'react';

const HomeMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeStore();
  const { user } = useUser();

  const { data: session, status } = useSession();

  // Simulate transition effect once session is loaded
  useEffect(() => {
    if (status !== 'loading') {
      const timeout = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const displayName = session?.user ?? user;

  return (
    <main className="relative w-full h-full">
      {/* AnimatePresence ensures exit animation runs (Spinner) */}
      {/* <AnimatePresence>
        {isLoading && (
          <motion.div
            key="spinner"
            className={`fixed top-0 left-0 w-full h-[100dvh] flex justify-center items-center z-50
            ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
          `}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* App Content */}
      {/* {!isLoading && ( */}
      <div className="relative">
        {/* Object to fill in the gaps */}
        <div
          className={`relative -top-96I
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
          `}
        >
          <Guide />
          <Header />
          <Working />
          {/* Bottom gradient background for header effect */}
          <div
            className={`z-0 relative bottom-80I h-auto w-full backdrop-blur-md -mb-160M
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-deep-dark'}
          `}
          >
            <Info />
          </div>
        </div>
        {!displayName ? (
          <div
            className={`z-0 absolute -bottom-208I flex justify-center items-center h-300H md:-bottom-96I md:h-192H w-full
              ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
              `}
          >
            <Image
              src={logo}
              className="relative bottom-80I w-96W md:w-144W"
              alt="logo"
            />
          </div>
        ) : (
          <div
            className={`z-0 absolute -bottom-320I flex justify-center items-center h-300H md:-bottom-96I md:h-192H w-full lg:-bottom-320I
              ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
              `}
          >
            <Image
              src={logo}
              className="relative w-144W bottom-96I xs:bottom-288I md:bottom-0 lg:bottom-240I"
              alt="logo"
            />
          </div>
        )}
      </div>
      {/* )} */}
    </main>
  );
};

export default HomeMain;
